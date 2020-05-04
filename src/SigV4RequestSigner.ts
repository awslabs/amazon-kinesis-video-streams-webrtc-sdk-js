import crypto from 'isomorphic-webcrypto';

import { QueryParams } from './QueryParams';
import { RequestSigner } from './RequestSigner';
import { Credentials } from './SignalingClient';
import { validateValueNonNil } from './internal/utils';

type Headers = { [header: string]: string };

/**
 * Utility class for SigV4 signing requests. The AWS SDK cannot be used for this purpose because it does not have support for WebSocket endpoints.
 */
export class SigV4RequestSigner implements RequestSigner {
    private static readonly DEFAULT_ALGORITHM = 'AWS4-HMAC-SHA256';
    private static readonly DEFAULT_SERVICE = 'kinesisvideo';

    private readonly region: string;
    private readonly credentials: Credentials;
    private readonly service: string;

    public constructor(region: string, credentials: Credentials, service: string = SigV4RequestSigner.DEFAULT_SERVICE) {
        this.region = region;
        this.credentials = credentials;
        this.service = service;
    }

    /**
     * Creates a SigV4 signed WebSocket URL for the given host/endpoint with the given query params.
     *
     * @param endpoint The WebSocket service endpoint including protocol, hostname, and path (if applicable).
     * @param queryParams Query parameters to include in the URL.
     * @param date Date to use for request signing. Defaults to NOW.
     *
     * Implementation note: Query parameters should be in alphabetical order.
     *
     * Note from AWS docs: "When you add the X-Amz-Security-Token parameter to the query string, some services require that you include this parameter in the
     * canonical (signed) request. For other services, you add this parameter at the end, after you calculate the signature. For details, see the API reference
     * documentation for that service." KVS Signaling Service requires that the session token is added to the canonical request.
     *
     * @see https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
     * @see https://gist.github.com/prestomation/24b959e51250a8723b9a5a4f70dcae08
     */
    public async getSignedURL(endpoint: string, queryParams: QueryParams, date: Date = new Date()): Promise<string> {
        // Refresh credentials
        if (typeof this.credentials.getPromise === 'function') {
            await this.credentials.getPromise();
        }
        validateValueNonNil(this.credentials.accessKeyId, 'credentials.accessKeyId');
        validateValueNonNil(this.credentials.secretAccessKey, 'credentials.secretAccessKey');

        // Prepare date strings
        const datetimeString = SigV4RequestSigner.getDateTimeString(date);
        const dateString = SigV4RequestSigner.getDateString(date);

        // Validate and parse endpoint
        const protocol = 'wss';
        const urlProtocol = `${protocol}://`;
        if (!endpoint.startsWith(urlProtocol)) {
            throw new Error(`Endpoint '${endpoint}' is not a secure WebSocket endpoint. It should start with '${urlProtocol}'.`);
        }
        if (endpoint.includes('?')) {
            throw new Error(`Endpoint '${endpoint}' should not contain any query parameters.`);
        }
        const pathStartIndex = endpoint.indexOf('/', urlProtocol.length);
        let host;
        let path;
        if (pathStartIndex < 0) {
            host = endpoint.substring(urlProtocol.length);
            path = '/';
        } else {
            host = endpoint.substring(urlProtocol.length, pathStartIndex);
            path = endpoint.substring(pathStartIndex);
        }

        const signedHeaders = ['host'].join(';');

        // Prepare method
        const method = 'GET'; // Method is always GET for signed URLs

        // Prepare canonical query string
        const credentialScope = dateString + '/' + this.region + '/' + this.service + '/' + 'aws4_request';
        const canonicalQueryParams = Object.assign({}, queryParams, {
            'X-Amz-Algorithm': SigV4RequestSigner.DEFAULT_ALGORITHM,
            'X-Amz-Credential': this.credentials.accessKeyId + '/' + credentialScope,
            'X-Amz-Date': datetimeString,
            'X-Amz-Expires': '299',
            'X-Amz-SignedHeaders': signedHeaders,
        });
        if (this.credentials.sessionToken) {
            Object.assign(canonicalQueryParams, {
                'X-Amz-Security-Token': this.credentials.sessionToken,
            });
        }
        const canonicalQueryString = SigV4RequestSigner.createQueryString(canonicalQueryParams);

        // Prepare canonical headers
        const canonicalHeaders = {
            host,
        };
        const canonicalHeadersString = SigV4RequestSigner.createHeadersString(canonicalHeaders);

        // Prepare payload hash
        const payloadHash = await SigV4RequestSigner.sha256('');

        // Combine canonical request parts into a canonical request string and hash
        const canonicalRequest = [method, path, canonicalQueryString, canonicalHeadersString, signedHeaders, payloadHash].join('\n');
        const canonicalRequestHash = await SigV4RequestSigner.sha256(canonicalRequest);

        // Create signature
        const stringToSign = [SigV4RequestSigner.DEFAULT_ALGORITHM, datetimeString, credentialScope, canonicalRequestHash].join('\n');
        const signingKey = await this.getSignatureKey(dateString);
        const signature = await SigV4RequestSigner.toHex(await SigV4RequestSigner.hmac(signingKey, stringToSign));

        // Add signature to query params
        const signedQueryParams = Object.assign({}, canonicalQueryParams, {
            'X-Amz-Signature': signature,
        });

        // Create signed URL
        return protocol + '://' + host + path + '?' + SigV4RequestSigner.createQueryString(signedQueryParams);
    }

    /**
     * Utility method for generating the key to use for calculating the signature. This combines together the date string, region, service name, and secret
     * access key.
     *
     * @see https://docs.aws.amazon.com/general/latest/gr/sigv4-calculate-signature.html
     */
    private async getSignatureKey(dateString: string): Promise<ArrayBuffer> {
        const kDate = await SigV4RequestSigner.hmac('AWS4' + this.credentials.secretAccessKey, dateString);
        const kRegion = await SigV4RequestSigner.hmac(kDate, this.region);
        const kService = await SigV4RequestSigner.hmac(kRegion, this.service);
        return await SigV4RequestSigner.hmac(kService, 'aws4_request');
    }

    /**
     * Utility method for converting a map of headers to a string for signing.
     */
    private static createHeadersString(headers: Headers): string {
        return Object.keys(headers)
            .map(header => `${header}:${headers[header]}\n`)
            .join();
    }

    /**
     * Utility method for converting a map of query parameters to a string with the parameter names sorted.
     */
    private static createQueryString(queryParams: QueryParams): string {
        return Object.keys(queryParams)
            .sort()
            .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
    }

    /**
     * Gets a datetime string for the given date to use for signing. For example: "20190927T165210Z"
     * @param date
     */
    private static getDateTimeString(date: Date): string {
        return date
            .toISOString()
            .replace(/\.\d{3}Z$/, 'Z')
            .replace(/[:\-]/g, '');
    }

    /**
     * Gets a date string for the given date to use for signing. For example: "20190927"
     * @param date
     */
    private static getDateString(date: Date): string {
        return this.getDateTimeString(date).substring(0, 8);
    }

    private static async sha256(message: string): Promise<string> {
        const hashBuffer = await crypto.subtle.digest({ name: 'SHA-256' }, this.toUint8Array(message));
        return this.toHex(hashBuffer);
    }

    private static async hmac(key: string | ArrayBuffer, message: string): Promise<ArrayBuffer> {
        const keyBuffer = typeof key === 'string' ? this.toUint8Array(key).buffer : key;
        const messageBuffer = this.toUint8Array(message).buffer;
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyBuffer,
            {
                name: 'HMAC',
                hash: {
                    name: 'SHA-256',
                },
            },
            false,
            ['sign'],
        );
        return await crypto.subtle.sign({ name: 'HMAC', hash: { name: 'SHA-256' } }, cryptoKey, messageBuffer);
    }

    /**
     * Note that this implementation does not work with two-byte characters.
     * However, no inputs into a signed signaling service request should have two-byte characters.
     */
    private static toUint8Array(input: string): Uint8Array {
        const buf = new ArrayBuffer(input.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = input.length; i < strLen; i++) {
            bufView[i] = input.charCodeAt(i);
        }
        return bufView;
    }

    private static toHex(buffer: ArrayBuffer): string {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
}
