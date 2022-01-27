import { AcronymsService } from './acronyms.service';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AcronymsEntity } from './entitites/acronyms.entity';

@ApiTags('Acronyms')
@Controller('acronyms')
export class AcronymsController {
  constructor(private readonly acronymsService: AcronymsService) {}

  @Get('acronym')
  async getProfile(@Body() req) {
    return this.acronymsService.findOne(req);
  }

  @Post()
  async createAcronym(@Body() body: AcronymsEntity) {
    return this.acronymsService.createAcronym(body);
  }

  @Get()
  async getAcronyms() {
    return this.acronymsService.getAcronyms();
  }

  @Delete()
  async deleteAcronym(@Body() body) {
    return this.acronymsService.deleteAcronym(body.id);
  }

  @Patch()
  async updateUser(@Body() body: AcronymsEntity) {
    return this.acronymsService.editAcronym(body);
  }
}
