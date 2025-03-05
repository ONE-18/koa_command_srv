import type { User } from "./User";
import type { Endpoint } from "./Endpoint";

export type Script = {
  name: string;
  code: string;
  language: "EN" | "ES";
  userId: User["_id"];
  endpointId: Endpoint["_id"];
}
