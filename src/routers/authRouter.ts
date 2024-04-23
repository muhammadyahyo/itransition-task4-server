import express from 'express';
import { check } from 'express-validator';

import { signIn, signUp } from '../controllers/authControllers';

const authRouter = express.Router();
authRouter.post(
  '/signup',
  [
    check('username', "Username can't be empty").notEmpty(),
    check('email', "E-mail can't be empty").notEmpty(),
    check('password', "Password can't be empty").notEmpty(),
  ],
  signUp
);
authRouter.post('/signin', signIn);

export default authRouter;