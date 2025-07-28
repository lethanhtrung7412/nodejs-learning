import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { ZitadelUser } from 'src/common/interface/zitadel-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists by zitadelId or email
    const existingUser = await this.userRepository.findOne({
      where: [
        { zitadelId: createUserDto.zitadelId },
        { email: createUserDto.email },
      ],
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findByZitadelId(zitadelId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { zitadelId },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findOrCreateFromZitadel(zitadelUser: ZitadelUser): Promise<User> {
    // Try to find existing user
    let user = await this.findByZitadelId(zitadelUser.sub);

    if (!user) {
      // Create new user from Zitadel profile
      const createUserDto: CreateUserDto = {
        zitadelId: zitadelUser.sub,
        email: zitadelUser.email,
        fullName:
          zitadelUser.name ||
          `${zitadelUser.given_name || ''} ${zitadelUser.family_name || ''}`.trim(),
      };

      user = await this.createUser(createUserDto);
    } else {
      // Update user info if changed
      let hasChanges = false;

      if (user.email !== zitadelUser.email) {
        user.email = zitadelUser.email;
        hasChanges = true;
      }

      const newFullName =
        zitadelUser.name ||
        `${zitadelUser.given_name || ''} ${zitadelUser.family_name || ''}`.trim();
      if (user.fullName !== newFullName) {
        user.fullName = newFullName;
        hasChanges = true;
      }

      if (hasChanges) {
        user = await this.userRepository.save(user);
      }
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(
    id: number,
    updateData: Partial<CreateUserDto>,
  ): Promise<User> {
    const user = await this.getUserById(id);
    Object.assign(user, updateData);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }
}
