import { validateValueNil, validateValueNonNil } from './utils';

describe('utils', () => {
    describe('validateValueNil', () => {
        it('should not throw for null value', () => {
            validateValueNil(null, 'test');
        });

        it('should not throw for undefined value', () => {
            validateValueNil(undefined, 'test');
        });

        it('should not throw for empty value', () => {
            validateValueNil('', 'test');
        });

        it('should throw for non-nil value', () => {
            expect(() => validateValueNil('not null', 'test')).toThrow('test should be null');
        });
    });

    describe('validateValueNonNil', () => {
        it('should throw for null value', () => {
            expect(() => validateValueNonNil(null, 'test')).toThrow('test cannot be null');
        });

        it('should throw for undefined value', () => {
            expect(() => validateValueNonNil(undefined, 'test')).toThrow('test cannot be undefined');
        });

        it('should throw for empty value', () => {
            expect(() => validateValueNonNil('', 'test')).toThrow('test cannot be empty');
        });

        it('should not throw for non-nil value', () => {
            validateValueNonNil('not null', 'test');
        });
    });
});
