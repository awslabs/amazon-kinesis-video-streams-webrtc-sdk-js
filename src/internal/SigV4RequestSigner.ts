import { Role } from 'kvs-webrtc/Role';

export type QueryParams = { [queryParam: string]: string };
type Headers = { [header: string]: string };

export interface SigV4RequestSignerDependencies {
    iso8601: typeof AWS.util.date.iso8601;
    hmac: typeof AWS.util.crypto.hmac;
    sha256: typeof AWS.util.crypto.sha256;
}

/**
 * Utility class for SigV4 signing requests. The AWS SDK cannot be used for this purpose because it does not have support for WebSocket endpoints.
 */
export class SigV4RequestSigner {
    private static readonly DEFAULT_ALGORITHM = 'AWS4-HMAC-SHA256';
    private static readonly DEFAULT_SERVICE = 'kinesisvideo';

    private readonly dependencies: SigV4RequestSignerDependencies;
    private readonly region: string;
    private readonly credentials: AWS.Credentials;
    private readonly service: string;

    public constructor(
        dependencies: SigV4RequestSignerDependencies,
        region: string,
        credentials: AWS.Credentials,
        service: string = SigV4RequestSigner.DEFAULT_SERVICE,
    ) {
        this.dependencies = dependencies;
        this.region = region;
        this.credentials = credentials;
        this.service = service;
    }

    /**
     * Creates a SigV4 signed WebSocket URL for the given host/endpoint with the given query params.
     *
     * @param endpoint The WebSocket service domain name. TODO: Take in a complete endpoint (e.g. wss://host:port/path) and parse out the host
     * @param queryParams Query parameters to include in the URL.
     * @param role TODO: Private Beta Only
     *
     * Implementation note: Query parameters should be in alphabetical order.
     *
     * Note from AWS docs: "When you add the X-Amz-Security-Token parameter to the query string, some services require that you include this parameter in the
     * canonical (signed) request. For other services, you add this parameter at the end, after you calculate the signature. For details, see the API reference
     * documentation for that service." KVS Signaling Service requires that the session token is added to the canonical request.
     *
     * Note for Private Beta: The method, path, and host used for signing are special overrides until a long-term authentication solution is established.
     *
     * @see https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
     * @see https://gist.github.com/prestomation/24b959e51250a8723b9a5a4f70dcae08
     */
    public getSignedURL(endpoint: string, queryParams: QueryParams, role: Role): string {
        // Prepare date strings
        const datetimeString = this.dependencies.iso8601(new Date()).replace(/[:\-]|\.\d{3}/g, '');
        const dateString = datetimeString.substr(0, 8);

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
            path = '';
        } else {
            host = endpoint.substring(urlProtocol.length, pathStartIndex);
            path = endpoint.substring(pathStartIndex);
        }

        const signingHost = '63xqwdo880.execute-api.us-west-2.amazonaws.com'; // TODO: Private Beta Only
        const signingPath = role === Role.MASTER ? '/prod/v1/connect-as-master' : '/prod/v1/connect-as-viewer'; // TODO: Private Beta Only
        const signedHeaders = ['host'].join(';');

        // Prepare method
        // const method = 'GET'; // Method is always GET for signed URLs
        const signingMethod = 'POST'; // TODO: Private Beta Only; Method is always GET for signed URLs

        // Prepare canonical query string
        const credentialScope = dateString + '/' + this.region + '/' + this.service + '/' + 'aws4_request';
        const canonicalQueryParams = Object.assign({}, queryParams, {
            'X-Amz-Algorithm': SigV4RequestSigner.DEFAULT_ALGORITHM,
            'X-Amz-Credential': encodeURIComponent(this.credentials.accessKeyId + '/' + credentialScope),
            'X-Amz-Date': datetimeString,
            'X-Amz-SignedHeaders': signedHeaders,
        });
        if (this.credentials.sessionToken) {
            Object.assign(canonicalQueryParams, {
                'X-Amz-Security-Token': encodeURIComponent(this.credentials.sessionToken),
            });
        }
        const canonicalQueryString = SigV4RequestSigner.createQueryString(canonicalQueryParams);

        // Prepare canonical headers
        const canonicalHeaders = {
            host: signingHost,
        };
        const canonicalHeadersString = SigV4RequestSigner.createHeadersString(canonicalHeaders);

        // Prepare payload hash
        const payloadHash = this.dependencies.sha256('', 'hex');

        // Combine canonical request parts into a canonical request string and hash
        const canonicalRequest = [signingMethod, signingPath, canonicalQueryString, canonicalHeadersString, signedHeaders, payloadHash].join('\n');
        const canonicalRequestHash = this.dependencies.sha256(canonicalRequest, 'hex');

        // Create signature
        const stringToSign = [SigV4RequestSigner.DEFAULT_ALGORITHM, datetimeString, credentialScope, canonicalRequestHash].join('\n');
        const signingKey = this.getSignatureKey(dateString);
        const signature = this.dependencies.hmac(signingKey, stringToSign, 'hex');

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
    private getSignatureKey(dateString: string): Buffer {
        const kDate = this.dependencies.hmac('AWS4' + this.credentials.secretAccessKey, dateString, 'buffer');
        const kRegion = this.dependencies.hmac(kDate, this.region, 'buffer');
        const kService = this.dependencies.hmac(kRegion, this.service, 'buffer');
        return this.dependencies.hmac(kService, 'aws4_request', 'buffer');
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
            .map(key => `${key}=${queryParams[key]}`)
            .join('&');
    }
}
