import { BaseRepository } from './baseRepo';
import { MUser } from '../models';
import type { User } from '../types/User';

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(MUser);
  }

  async findByType(type: string): Promise<User[]> {
    return this.model.find({ type }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email }).exec();
  }

  async changeIdioms(id: string, idioms: string): Promise<User | null> {
    return this.model.findByIdAndUpdate(id, { idioms }, { new: true }).exec();
  }
}

export const userRepository = new UserRepository();