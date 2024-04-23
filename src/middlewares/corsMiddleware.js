"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsResolver = (request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', '*');
    next();
};
exports.default = corsResolver;
