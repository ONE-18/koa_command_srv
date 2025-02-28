import { BaseRepository } from './baseRepo';
import { User } from '../models';
import type { IUser } from '../types/IUser';

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByType(type: string): Promise<IUser[]> {
    return this.model.find({ type }).exec();
  }
}

export const userRepository = new UserRepository();