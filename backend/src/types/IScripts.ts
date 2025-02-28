import { Document } from "mongoose";
import type { IUser } from "./IUser";
import type { IEndpoint } from "./IEndpoint";
import { Language } from "../models";

export interface IScript extends Document {
  name: string;
  code: string;
  language: Language;
  userId: IUser["_id"];
  endpointId: IEndpoint["_id"];
}
