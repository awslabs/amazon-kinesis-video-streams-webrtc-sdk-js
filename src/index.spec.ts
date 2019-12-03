import { VERSION } from './index';

describe('index', () => {
    it('should export the version', () => {
        expect(VERSION).not.toBeFalsy();
    });
});
