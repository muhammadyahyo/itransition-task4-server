"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const checkAuth = (request, response, next) => {
    if (request.method === 'OPTIONS') {
        next();
    }
    const authHeader = request.header('Authorization');
    if (authHeader) {
        const [type, token] = authHeader.split(' ');
        if (type === 'Bearer' && jsonwebtoken_1.default.verify(token, constants_1.SECRET_KEY)) {
            return next();
        }
    }
    return response.status(403).json({ message: 'Invalid token' });
};
exports.default = checkAuth;
