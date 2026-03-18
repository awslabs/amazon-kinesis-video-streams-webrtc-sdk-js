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
