import { Document } from "mongoose";
import { PetitionType } from "../models";

export interface IEndpoint extends Document {
  rute: string;
  petitionType: PetitionType;
  authentication: string;
}