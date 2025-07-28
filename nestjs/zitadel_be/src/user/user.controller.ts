import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  @Get('me')
  getCurrentUser(@Request() user: User) {
    return { user };
  }
}
