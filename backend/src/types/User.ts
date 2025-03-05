import { UserType } from "../models";

export type User = {
  _id: string;
  name: string;
  password: string;
  email: string;
  type: UserType;
  idioms: string;
}