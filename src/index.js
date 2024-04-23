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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const corsMiddleware_1 = __importDefault(require("./middlewares/corsMiddleware"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const usersRouter_1 = __importDefault(require("./routers/usersRouter"));
const PORT = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(corsMiddleware_1.default);
app.use('/users', usersRouter_1.default);
app.use('/auth', authRouter_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb+srv://latifov:ggxx0wxJMebJdzZO@mongodbdars1.ggakb.mongodb.net/?retryWrites=true&w=majority&appName=mongodbDars1');
        app.listen(PORT, () => console.log(`server started PORT => ${PORT} `));
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
start();
