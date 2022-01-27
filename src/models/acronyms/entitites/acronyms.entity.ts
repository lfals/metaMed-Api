import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('acronyms')
export class AcronymsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ length: 100 })
  name: string;

  @ApiProperty()
  @Column({ length: 100 })
  description: string;

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  applicability: string;

  @ApiProperty()
  @Column()
  language: string;

  @ApiProperty()
  @Column({ nullable: true })
  translation: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;
}
