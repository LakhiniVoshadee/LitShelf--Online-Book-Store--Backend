"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = 'ExiXGmnNx2pWE7eXj3sBtFabIjTpSZQ3';
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("AuthHeader  : ", authHeader);
    if (!authHeader) {
        return res.status(401).json({
            message: 'token header missing',
        });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'token is missing',
        });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = decode;
        console.log("AuthenticatePassed");
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: 'Unauthorize token',
        });
    }
};
exports.authenticate = authenticate;
