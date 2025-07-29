"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.APIError = APIError;
