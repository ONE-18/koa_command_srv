import { PetitionType } from "../models";

export type Endpoint = {
  _id: string;
  route: string;
  petitionType: PetitionType;
  authentication: string;
  status: boolean;
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
  };

  return endpointSchemaDefinition;
};