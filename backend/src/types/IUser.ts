import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  type: "ADMIN" | "USER";
}