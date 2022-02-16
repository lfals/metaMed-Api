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
    return this.maneuversRepository.save(maneuver).then((response) => {
      console.log(response);

      throw new HttpException(
        { message: 'Maneuver Edit Success', response: response },
        HttpStatus.OK,
      );
    });
  }
}
