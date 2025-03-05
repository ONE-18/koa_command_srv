import { BaseRepository } from './baseRepo';
import { MEndpoint } from '../models';
import type { Endpoint } from '../types/Endpoint';

class EndpointRepository extends BaseRepository<Endpoint> {
  constructor() {
    super(MEndpoint);
  }

  async findByPetitionType(petitionType: string): Promise<Endpoint[]> {
    return this.model.find({ petitionType }).exec();
  }
}

export const endpointRepository = new EndpointRepository();