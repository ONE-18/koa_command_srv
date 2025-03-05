import { PetitionType } from "../models";

export type Endpoint = {
  _id: string;
  rute: string;
  petitionType: PetitionType;
  authentication: string;
}