import { AcronymsEntity } from './entitites/acronyms.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcronymsService } from './acronyms.service';
import { AcronymsController } from './acronyms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AcronymsEntity])],
  providers: [AcronymsService],
  controllers: [AcronymsController],
  exports: [AcronymsService],
})
export class AcronymsModule {}
