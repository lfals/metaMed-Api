import { AcronymsService } from './acronyms.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AcronymsEntity } from './entitites/acronyms.entity';

@ApiTags('Acronyms')
@Controller('acronyms')
export class AcronymsController {
  constructor(private readonly acronymsService: AcronymsService) {}

  @Post()
  async createAcronym(@Body() body: AcronymsEntity) {
    return this.acronymsService.createAcronym(body);
  }
}
