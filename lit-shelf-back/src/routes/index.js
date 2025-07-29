"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoute_1 = __importDefault(require("./userRoute"));
const bookRoute_1 = __importDefault(require("./bookRoute"));
const borrowBookRoute_1 = __importDefault(require("./borrowBookRoute"));
/*
import bookRoute from "./bookRoute";
*/
const rootRouter = (0, express_1.Router)();
rootRouter.use('/users', userRoute_1.default);
rootRouter.use('/books', bookRoute_1.default);
rootRouter.use('/booksBorrow', borrowBookRoute_1.default);
exports.default = rootRouter;
