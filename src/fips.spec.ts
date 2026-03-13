/**
 * Unit tests for FIPS endpoint functionality
 */

import { FipsConfig, generateStunUrl, shouldSetFipsEndpoint } from './FipsUtils';

describe('FIPS Endpoint Configuration', () => {
    describe('generateStunUrl', () => {
        test('should generate stuns URL with FIPS suffix for standard endpoint', () => {
            const config: FipsConfig = {
                useFipsEndpoints: true,
                useDualStackEndpoints: false,
                region: 'us-gov-east-1',
            };

            const url = generateStunUrl(config);

            expect(url).toBe('stuns:stun.kinesisvideo-fips.us-gov-east-1.amazonaws.com:443');
        });

        test('should generate stun URL without FIPS suffix for standard endpoint', () => {
            const config: FipsConfig = {
                useFipsEndpoints: false,
                useDualStackEndpoints: false,
                region: 'us-west-1',
            };

            const url = generateStunUrl(config);

            expect(url).toBe('stun:stun.kinesisvideo.us-west-1.amazonaws.com:443');
        });

        test('should generate stuns URL with FIPS suffix for dual-stack endpoint', () => {
            const config: FipsConfig = {
                useFipsEndpoints: true,
                useDualStackEndpoints: true,
                region: 'us-gov-east-1',
            };

            const url = generateStunUrl(config);

            expect(url).toBe('stuns:stun.kinesisvideo-fips.us-gov-east-1.api.aws:443');
        });

        test('should generate stun URL without FIPS suffix for dual-stack endpoint', () => {
            const config: FipsConfig = {
                useFipsEndpoints: false,
                useDualStackEndpoints: true,
                region: 'us-west-1',
            };

            const url = generateStunUrl(config);

            expect(url).toBe('stun:stun.kinesisvideo.us-west-1.api.aws:443');
        });
    });

    describe('shouldSetFipsEndpoint', () => {
        test('should return true when custom endpoint is provided with FIPS enabled', () => {
            const result = shouldSetFipsEndpoint('https://custom.endpoint.com', true);

            expect(result).toBe(true);
        });

        test('should return true when no custom endpoint and FIPS is enabled', () => {
            const result = shouldSetFipsEndpoint(null, true);

            expect(result).toBe(true);
        });

        test('should return false when no custom endpoint and FIPS is disabled', () => {
            const result = shouldSetFipsEndpoint(null, false);

            expect(result).toBe(false);
        });
    });
});
