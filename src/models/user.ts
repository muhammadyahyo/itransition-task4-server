import mongoose from 'mongoose';

const { Schema } = mongoose;
const userScheme = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    registrationDate: {
      type: String,
      required: true,
    },
    lastLoginDate: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false }
);

export default mongoose.model('User', userScheme);