import { ManeuversEntity } from './entities/maneuvers.entity';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManeuversService } from './maneuvers.service';

@ApiTags('Maneuvers')
@Controller('maneuvers')
export class ManeuversController {
  constructor(private readonly maneuversSerice: ManeuversService) {}

  @Get('maneuver')
  async getManeuver(@Body() req) {
    return this.maneuversSerice.findOne(req);
  }

  @Post()
  async createManeuver(@Body() body: ManeuversEntity) {
    return this.maneuversSerice.createManeuver(body);
  }

  @Get()
  async getManeuvers() {
    return this.maneuversSerice.getManeuvers();
  }

  @Delete()
  async deleteManeuver(@Body() body) {
    return this.maneuversSerice.deleteManeuver(body.id);
  }

  @Patch()
  async updateManeuver(@Body() body: ManeuversEntity) {
    return this.maneuversSerice.editManeuver(body);
  }
}
