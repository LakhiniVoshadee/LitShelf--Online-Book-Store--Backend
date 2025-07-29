"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCodeGenerator = void 0;
const VerificationCodeGenerator = () => {
    const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
    return randomSixDigit;
};
exports.VerificationCodeGenerator = VerificationCodeGenerator;
