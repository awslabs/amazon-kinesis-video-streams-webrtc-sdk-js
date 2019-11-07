import { Role } from 'kvs-webrtc/Role';
export declare type QueryParams = {
    [queryParam: string]: string;
};
export interface Credentials {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
}
/**
 * Utility class for SigV4 signing requests. The AWS SDK cannot be used for this purpose because it does not have support for WebSocket endpoints.
 */
export declare class SigV4RequestSigner {
    private static readonly DEFAULT_ALGORITHM;
    private static readonly DEFAULT_SERVICE;
    private readonly region;
    private readonly credentials;
    private readonly service;
    constructor(region: string, credentials: Credentials, service?: string);
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
    getSignedURL(endpoint: string, queryParams: QueryParams, role: Role): Promise<string>;
    /**
     * Utility method for generating the key to use for calculating the signature. This combines together the date string, region, service name, and secret
     * access key.
     *
     * @see https://docs.aws.amazon.com/general/latest/gr/sigv4-calculate-signature.html
     */
    private getSignatureKey;
    /**
     * Utility method for converting a map of headers to a string for signing.
     */
    private static createHeadersString;
    /**
     * Utility method for converting a map of query parameters to a string with the parameter names sorted.
     */
    private static createQueryString;
    /**
     * Gets a datetime string for the given date to use for signing. For example: "20190927T165210Z"
     * @param date
     */
    private static getDateTimeString;
    /**
     * Gets a date string for the given date to use for signing. For example: "20190927"
     * @param date
     */
    private static getDateString;
    private static sha256;
    private static hmac;
    private static toUint8Array;
    private static toHex;
}
