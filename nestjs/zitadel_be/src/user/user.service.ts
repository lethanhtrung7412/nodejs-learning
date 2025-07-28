import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByZitadelId(zitadelId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { zitadelId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(email: string, zitadelId: string): Promise<User> {
    const user = this.userRepository.create({
      email,
      zitadelId,
    });
    return this.userRepository.save(user);
  }

  async findOrCreateUser(email: string, zitadelId: string): Promise<User> {
    let user = await this.findByZitadelId(zitadelId);

    if (!user) {
      user = await this.createUser(email, zitadelId);
    }

    return user;
  }
}
