import type { User } from "./User";
import type { Endpoint } from "./Endpoint";
import { Language } from "../models";

export type Script = {
  name: string;
  code: string;
  language: Language;
  userId: User["_id"];
  endpointId: Endpoint["_id"];
}
