import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/models/users/entities/users.entity';
import { check } from 'src/helpers/encryption/hashing.helpers';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    const checkval = await check(pass, user.password);
    if (checkval) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('Wrong user password', HttpStatus.FORBIDDEN);
  }

  async login(body: UsersEntity) {
    const user = await this.validateUser(body.email, body.password);

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      isActive: user.isActive,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
