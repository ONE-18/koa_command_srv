import { PetitionType } from "../models";
import type { Script } from "./Scripts";

export type Endpoint = {
  _id: string;
  route: string;
  petitionType: PetitionType;
  authentication: string;
  status: boolean;
  scriptId: Script["_id"];
}

export const getEndpointSchema = () => {
  const endpointSchemaDefinition: Record<string, any> = {
    route: { type: String, required: true },
    petitionType: {
      type: String,
      enum: PetitionType,
      required: true,
    },
    authentication: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    scriptId: { type: String, required: false },
  };

  return endpointSchemaDefinition;
};