import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ZitadelUser } from './interface/zitadel-user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { zitadelId: createUserDto.zitadelId },
      ],
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async createFromZitadel(userInfo: ZitadelUser): Promise<User> {
    const createUserDto: CreateUserDto = {
      zitadelId: userInfo.sub,
      email: userInfo.email,
      name:
        userInfo.name ||
        `${userInfo.given_name} ${userInfo.family_name}`.trim(),
    };

    return await this.create(createUserDto);
  }

  healthCheck(): string {
    return 'Hello world';
  }
}
