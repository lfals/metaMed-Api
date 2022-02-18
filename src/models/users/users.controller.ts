import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UsersEntity } from 'src/models/users/entities/users.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Body() req) {
    return this.usersService.findOne(req);
  }
  @Post()
  async createUser(@Body() body: UsersEntity) {
    return this.usersService.createUser(body);
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Body() body) {
    return this.usersService.deleteUser(body.id);
  }

  @Patch()
  async updateUser(@Body() body: UsersEntity) {
    return this.usersService.editUser(body);
  }
}
