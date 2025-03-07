import mongoose from "mongoose";
import type { User } from "./User";
import type { Endpoint } from "./Endpoint";
import { Language } from "../models";

export type Script = {
  _id: string;
  name: string;
  code: string;
  language: Language;
  userId: User["_id"];
  endpointId: Endpoint["_id"];
}

export const getScriptSchema = () => {
  const scriptSchemaDefinition: Record<string, any> = {
    name: { type: String, required: true },
    code: { type: String, required: true },
    language: {
      type: String,
      enum: Language,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    endpointId: {
      type: String,
      required: true,
    },
  };

  const scriptSchema = new mongoose.Schema(scriptSchemaDefinition);
  return scriptSchema;
}
