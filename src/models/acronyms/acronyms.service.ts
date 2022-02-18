import { AcronymsEntity } from './entitites/acronyms.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AcronymsService {
  constructor(
    @InjectRepository(AcronymsEntity)
    private acronymsRepository: Repository<AcronymsEntity>,
  ) {}

  async findOne(id) {
    return this.acronymsRepository.findOne({ id: id });
  }

  async createAcronym(acronym: AcronymsEntity) {
    const newAcronym = new AcronymsEntity();

    newAcronym.name = acronym.name;
    newAcronym.description = acronym.description;
    newAcronym.applicability = acronym.applicability;
    newAcronym.language = acronym.language;
    newAcronym.translation = acronym.translation;
    newAcronym.isActive = acronym.isActive;

    await this.acronymsRepository
      .findOne({ name: acronym.name })
      .then((acronym) => {
        if (acronym) {
          throw new HttpException(
            'Acronym Already exists',
            HttpStatus.CONFLICT,
          );
        }
        return this.acronymsRepository.save(newAcronym).then((acronym) => {
          throw new HttpException(
            { message: 'Acronym Created', Acronym: acronym.name },
            HttpStatus.CREATED,
          );
        });
      });
  }

  async getAcronyms() {
    return await this.acronymsRepository.findAndCount();
  }

  async deleteAcronym(id) {
    return await this.acronymsRepository
      .delete({ id: id })
      .then(() => {
        throw new HttpException('Acronym Deleted', HttpStatus.OK);
      })
      .catch((err) => {
        throw new HttpException(
          { message: 'Error on acronym delete', error: err },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async editAcronym(acronym: AcronymsEntity) {
    return this.acronymsRepository.save(acronym).then((response) => {
      throw new HttpException(
        {
          message: 'Acronym edit success',
          response: response,
        },
        HttpStatus.OK,
      );
    });
  }
}
