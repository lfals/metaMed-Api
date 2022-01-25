import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDTO } from 'src/dto/login.dto';
import { AuthService } from './auth.service';
import * as api from '../documentation/api.documentation.json';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Users')
  @Post('auth/login')
  async login(@Body() req) {
    return this.authService.login(req);
  }
}
