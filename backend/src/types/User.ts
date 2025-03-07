import mongoose from 'mongoose';
import { UserType, Idioms } from '../models';

export type User = {
  _id: string;
  name: string;
  password: string;
  email: string;
  type: string;
  idiom: string;
}

export const getUserSchema = () => {
  const userSchemaDefinition: Record<string, any> = {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    type: {
      type: String,
      enum: UserType,
      required: true,
    },
    idiom: {
      type: String,
      enum: Idioms,
      required: true,
      default: Idioms.ES,
    },
  };

  const userSchema = new mongoose.Schema(userSchemaDefinition);
  return userSchema;
};