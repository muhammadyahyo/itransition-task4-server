"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const user_1 = __importDefault(require("../models/user"));
const generateToken = (id, email) => {
    return jsonwebtoken_1.default.sign({ id, email }, constants_1.SECRET_KEY, { expiresIn: '4h' });
};
const signUp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationErrors = (0, express_validator_1.validationResult)(request);
        if (!validationErrors.isEmpty()) {
            response.status(400).json({ message: 'Registration error', isOk: false, validationErrors });
        }
        const { username, email, password } = request.body;
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return response.status(400).json({ message: 'User already exists', isOk: false });
        }
        const hashPassword = bcryptjs_1.default.hashSync(password, 6);
        const todayDate = new Date().toLocaleString('ru-RU');
        const newUser = new user_1.default({
            username,
            email,
            password: hashPassword,
            registrationDate: todayDate,
            lastLoginDate: todayDate,
            isBlocked: false,
        });
        yield newUser.save();
        return response.json({ message: 'You have signed up', isOk: true });
    }
    catch (error) {
        response.status(400).json({ message: 'Registration error', isOk: false });
        throw new Error(`${error}`);
    }
});
exports.signUp = signUp;
const signIn = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return response.status(400).json({ message: "It seems you don't have an account", isOk: false });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return response.status(400).json({ message: 'Incorrect password!', isOk: false });
        }
        if (user.isBlocked) {
            return response.status(403).json({ message: "User is blocked and can't sign in!", isOk: false });
        }
        const todayDate = new Date().toLocaleString('ru-RU');
        yield user_1.default.findByIdAndUpdate(user._id, {
            lastLoginDate: todayDate,
        });
        const token = generateToken(user._id.toString(), user.email);
        return response.json({ token });
    }
    catch (error) {
        response.status(400).json({ message: 'Authorization error', isOk: false });
        throw new Error(`${error}`);
    }
});
exports.signIn = signIn;
