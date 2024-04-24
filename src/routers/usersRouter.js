"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const usersMiddlewares_1 = __importDefault(require("../middlewares/usersMiddlewares"));
const usersRouter = express_1.default.Router();
usersRouter.get('/users', usersMiddlewares_1.default, usersController_1.getUsers);
usersRouter.get('/:id', usersMiddlewares_1.default, usersController_1.getUserById);
usersRouter.delete('/:id', usersMiddlewares_1.default, usersController_1.deleteUser);
usersRouter.put('/:id', usersMiddlewares_1.default, usersController_1.updateUser);
exports.default = usersRouter;
