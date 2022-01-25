import { ValidationPipe } from './../validation/validation.pipe';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UsersEntity } from 'src/entity/user.entity';

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
  async createUser(@Body(new ValidationPipe()) body: UsersEntity) {
    return this.usersService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Body() body) {
    return this.usersService.getUsers(body.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Body() body) {
    return this.usersService.deleteUser(body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(@Body(new ValidationPipe()) body: UsersEntity) {
    return this.usersService.editUser(body);
  }
}
