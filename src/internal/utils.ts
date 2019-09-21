/**
 * Validates that the given value is not null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateValueNonNil(value: any, valueName: string): void {
    if (value === null) {
        throw new Error(`${valueName} cannot be null`);
    } else if (value === undefined) {
        throw new Error(`${valueName} cannot be undefined`);
    } else if (value === '') {
        throw new Error(`${valueName} cannot be empty`);
    }
}

/**
 * Validates that the given value is null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateValueNil(value: any, valueName: string): void {
    if (value !== null && value !== undefined && value !== '') {
        throw new Error(`${valueName} should be null`);
    }
}
