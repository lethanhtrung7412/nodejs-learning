import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './current-users.decorator';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return {
      message: 'Profile retrieved successfully',
      user: user,
      method: 'JWT Verification',
    };
  }

  // Lấy chỉ userId
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser('userId') userId: string) {
    return {
      userId,
      method: 'JWT Verification',
    };
  }
}
