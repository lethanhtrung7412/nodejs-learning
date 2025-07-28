import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth('zitadel-jwt')
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Not authorized' })
@UseGuards(AuthGuard('zitadel'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('health')
  getHello(): string {
    return 'Hello world';
  }

  @Get()
  async findAll() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ) {
    return await this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.deleteUser(+id);
  }
}
