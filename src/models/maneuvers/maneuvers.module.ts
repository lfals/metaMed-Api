import { ManeuversService } from './maneuvers.service';
import { ManeuversEntity } from './entities/maneuvers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ManeuversController } from './maneuvers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ManeuversEntity])],
  providers: [ManeuversService],
  controllers: [ManeuversController],
  exports: [ManeuversService],
})
export class ManeuverModule {}
