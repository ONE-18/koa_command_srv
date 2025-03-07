import { BaseRepository } from './baseRepo';
import { MEndpoint } from '../models';
import type { Endpoint } from '../types/Endpoint';

class EndpointRepository extends BaseRepository<Endpoint> {
  constructor() {
    super(MEndpoint);
  }

  async findByPetitionType(petitionType: string): Promise<Endpoint[]> {
    const list = await this.model.find({ petitionType }).exec();
    return list ? list.map(endpoint => endpoint.toObject() as Endpoint) : [];
  }
}

export const endpointRepository = new EndpointRepository();