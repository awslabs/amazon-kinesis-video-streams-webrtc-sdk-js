"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Validates that the given value is not null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateValueNonNil(value, valueName) {
    if (value === null) {
        throw new Error(valueName + " cannot be null");
    }
    else if (value === undefined) {
        throw new Error(valueName + " cannot be undefined");
    }
    else if (value === '') {
        throw new Error(valueName + " cannot be empty");
    }
}
exports.validateValueNonNil = validateValueNonNil;
/**
 * Validates that the given value is null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateValueNil(value, valueName) {
    if (value !== null && value !== undefined && value !== '') {
        throw new Error(valueName + " should be null");
    }
}
exports.validateValueNil = validateValueNil;
//# sourceMappingURL=utils.js.map