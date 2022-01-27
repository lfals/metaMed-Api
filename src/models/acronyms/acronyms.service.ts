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
    const oldAcronym = await this.acronymsRepository.findOne(acronym.id);

    const updatedAcronym = new AcronymsEntity();

    updatedAcronym.name = acronym.name ? acronym.name : oldAcronym.name;

    updatedAcronym.description = acronym.description
      ? acronym.description
      : oldAcronym.description;

    updatedAcronym.language = acronym.language
      ? acronym.language
      : oldAcronym.language;

    updatedAcronym.translation = acronym.translation
      ? acronym.translation
      : oldAcronym.translation;

    updatedAcronym.isActive = acronym.isActive
      ? acronym.isActive
      : oldAcronym.isActive;

    this.acronymsRepository
      .update(acronym.id, updatedAcronym)
      .then(() => {
        throw new HttpException('User edited ', HttpStatus.OK);
      })
      .catch((err) => {
        throw new HttpException(
          { message: 'Error on acronym edit', error: err },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
