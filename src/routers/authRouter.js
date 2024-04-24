"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authControllers_1 = require("../controllers/authControllers");
const authRouter = express_1.default.Router();
authRouter.post('/signup', [
    (0, express_validator_1.check)('username', "Username can't be empty").notEmpty(),
    (0, express_validator_1.check)('email', "E-mail can't be empty").notEmpty(),
    (0, express_validator_1.check)('password', "Password can't be empty").notEmpty(),
], authControllers_1.signUp);
authRouter.post('/signin', authControllers_1.signIn);
exports.default = authRouter;
