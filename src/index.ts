import express from 'express';
import mongoose from 'mongoose';


import corsResolver from './middlewares/corsMiddleware';
import authRouter from './routers/authRouter';
import usersRouter from './routers/usersRouter';

const PORT = 8000

const app = express();
app.use(express.json());
app.use(corsResolver);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://latifov:ggxx0wxJMebJdzZO@mongodbdars1.ggakb.mongodb.net/?retryWrites=true&w=majority&appName=mongodbDars1'
    );
    app.listen(PORT, () => console.log(`server started PORT => ${PORT} `));
  } catch (error) {
    throw new Error(`${error}`);
  }
};

start();