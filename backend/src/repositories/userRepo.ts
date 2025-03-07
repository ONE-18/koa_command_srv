import { BaseRepository } from './baseRepo';
import { type User } from '../types/User';
import { MUser } from '../models';

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(MUser)
  }

  async findByType(type: string): Promise<User[]> {
    const users = await this.model.find({ type }).exec();
    return users.map(user => user.toObject() as User);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ email }).exec();
    return user ? (user.toObject() as User) : null;
  }

  async changeIdioms(id: string, idioms: string): Promise<User | null> {
    const user = await this.model.findByIdAndUpdate(id, { idioms }, { new: true }).exec();
    return user ? (user.toObject() as User) : null;
  }
}

export const userRepository = new UserRepository();