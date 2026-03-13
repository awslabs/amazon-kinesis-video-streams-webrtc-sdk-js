/**
 * Utility functions for FIPS endpoint configuration
 */

export interface FipsConfig {
    useFipsEndpoints: boolean;
    useDualStackEndpoints: boolean;
    region: string;
}

/**
 * Generates STUN server URL based on FIPS configuration
 */
export function generateStunUrl(config: FipsConfig): string {
    const protocol = config.useFipsEndpoints ? 'stuns' : 'stun';
    const fipsSuffix = config.useFipsEndpoints ? '-fips' : '';

    if (config.useDualStackEndpoints) {
        return `${protocol}:stun.kinesisvideo${fipsSuffix}.${config.region}.api.aws:443`;
    }
    return `${protocol}:stun.kinesisvideo${fipsSuffix}.${config.region}.amazonaws.com:443`;
}

/**
 * Determines if useFipsEndpoint should be set for AWS SDK clients.
 * When a custom endpoint is provided, it is left unmodified, but the FIPS flag is still
 * returned so that STUN URLs are generated with the correct protocol (stuns).
 */
export function shouldSetFipsEndpoint(_customEndpoint: string | null | undefined, useFipsEndpoints: boolean): boolean {
    return useFipsEndpoints;
}
