import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('maneuvers')
export class ManeuversEntity {
@ApiProperty()
@PrimaryGeneratedColumn('uuid')
id: string

@ApiProperty()
@Column()
name: string

@ApiProperty()
@Column()
description: string

@ApiProperty()
@Column()
aplicability: string

@ApiProperty()
@Column()
ifPositive: string

@ApiProperty()
@Column({nullable: true})
ifNegative: string

@ApiProperty()
@Column()
who: string 

@ApiProperty()
@Column({nullable: true})
image: string

@ApiProperty()
@Column({default: true})
isActive: boolean

}