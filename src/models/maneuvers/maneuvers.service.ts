import { ManeuversEntity } from './entities/maneuvers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ManeuversService {
  constructor(
    @InjectRepository(ManeuversEntity)
    private maneuversRepository: Repository<ManeuversEntity>,
  ) {}

  async findOne(id) {
    const maneuver = await this.maneuversRepository.findOne({ id: id });
    if (maneuver) {
      return maneuver;
    }
    throw new HttpException('Maneuver not exist', HttpStatus.NOT_FOUND);
  }

  async createManeuver(maneuver: ManeuversEntity) {
    const newManeuver = new ManeuversEntity();

    newManeuver.name = maneuver.name;
    newManeuver.description = maneuver.description;
    newManeuver.aplicability = maneuver.aplicability;
    newManeuver.ifNegative = maneuver.ifNegative;
    newManeuver.ifPositive = maneuver.ifPositive;
    newManeuver.image = maneuver.image;
    newManeuver.who = maneuver.who;
    newManeuver.isActive = maneuver.isActive;

    await this.maneuversRepository
      .findOne({ name: maneuver.name })
      .then((maneuver) => {
        if (maneuver) {
          throw new HttpException(
            'Maneuver Already exists',
            HttpStatus.CONFLICT,
          );
        }
        return this.maneuversRepository.save(newManeuver).then((maneuver) => {
          throw new HttpException(
            { message: 'Maneuver Created', Maneuver: maneuver.name },
            HttpStatus.CREATED,
          );
        });
      });
  }

  async getManeuvers() {
    return await this.maneuversRepository.findAndCount();
  }

  async deleteManeuver(id) {
    return await this.maneuversRepository
      .delete({ id: id })
      .then(() => {
        throw new HttpException('Maneuver Deleted', HttpStatus.OK);
      })
      .catch((err) => {
        throw new HttpException(
          { message: 'Error on maneuver delete', error: err },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async editManeuver(maneuver: ManeuversEntity) {
    const oldManeuver = await this.maneuversRepository.findOne(maneuver.id);

    const updatedManeuver = new ManeuversEntity();

    updatedManeuver.name = maneuver.name ? maneuver.name : oldManeuver.name;

    updatedManeuver.description = maneuver.description
      ? maneuver.description
      : oldManeuver.description;

    updatedManeuver.aplicability = maneuver.aplicability
      ? maneuver.aplicability
      : oldManeuver.aplicability;

    updatedManeuver.ifPositive = maneuver.ifPositive
      ? maneuver.ifPositive
      : oldManeuver.ifPositive;

    updatedManeuver.ifNegative = maneuver.ifNegative
      ? maneuver.ifNegative
      : oldManeuver.ifNegative;

    updatedManeuver.who = maneuver.who ? maneuver.who : oldManeuver.who;

    updatedManeuver.image = maneuver.image ? maneuver.image : oldManeuver.image;

    updatedManeuver.isActive = maneuver.isActive
      ? maneuver.isActive
      : oldManeuver.isActive;

    this.maneuversRepository
      .update(maneuver.id, updatedManeuver)
      .then(() => {
        throw new HttpException('Maneuver Edited', HttpStatus.OK);
      })
      .catch((err) => {
        throw new HttpException(
          { message: 'Error on Maneuver edit', error: err },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
