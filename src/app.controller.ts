import { AppService } from './app.service';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as api from './documentation/api.documentation.json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('System')
  @ApiOkResponse(api.paths['/status'].get.responses[200])
  @Get('status')
  async getStatus() {
    return this.appService.getStatus();
  }
}
