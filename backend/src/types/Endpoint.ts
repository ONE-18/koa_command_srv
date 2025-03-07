import { PetitionType } from "../models";

export type Endpoint = {
  _id: string;
  rute: string;
  petitionType: PetitionType;
  authentication: string;
}

export const getEndpointSchema = () => {
  const endpointSchemaDefinition: Record<string, any> = {
    rute: { type: String, required: true },
    petitionType: {
      type: String,
      enum: PetitionType,
      required: true,
    },
    authentication: { type: String, required: true },
  };

  return endpointSchemaDefinition;
};