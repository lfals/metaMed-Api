import { UsersEntity } from './entities/users.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'src/helpers/encryption/hashing.helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async findOne(id) {
    return this.usersRepository.findOne({ email: id });
  }

  async createUser(user: UsersEntity) {
    const newUser = new UsersEntity();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = await hash(user.password);
    newUser.role = user.role ? user.role : 'user';
    newUser.isActive = user.isActive ? user.isActive : true;

    await this.usersRepository.findOne({ email: user.email }).then((user) => {
      if (user) {
        throw new HttpException('User Already exists', HttpStatus.CONFLICT);
      }

      return this.usersRepository.save(newUser).then((user) => {
        throw new HttpException(
          { message: 'User Created', userId: user.id },
          HttpStatus.CREATED,
        );
      });
    });
  }

  async getUsers() {
    return await this.usersRepository.findAndCount();
  }

  async deleteUser(id) {
    const user = await this.usersRepository.findOne({ id: id });
    if (user.role === 'admin') {
      return await this.usersRepository
        .delete({ id: id })
        .then(() => {
          throw new HttpException('User Deleted', HttpStatus.OK);
        })
        .catch((err) => {
          throw new HttpException(
            { message: 'Error on user delete', error: err },
            HttpStatus.BAD_REQUEST,
          );
        });
    }

    throw new HttpException(
      { error: 'user not authorized' },
      HttpStatus.BAD_REQUEST,
    );
  }

  async editUser(user: UsersEntity) {
    const oldUser = await this.usersRepository.findOne(user.id);

    const updatedUser = new UsersEntity();

    updatedUser.name = user.name ? user.name : oldUser.name;
    updatedUser.email = user.email ? user.email : oldUser.email;
    updatedUser.role = user.role ? user.role : oldUser.role;
    updatedUser.password = user.password
      ? await hash(user.password)
      : oldUser.password;
    updatedUser.isActive = user.isActive ? user.isActive : oldUser.isActive;

    this.usersRepository.update(user.id, updatedUser);

    throw new HttpException('User edited ', HttpStatus.OK);
  }

  async getUser(id) {
    const user = await this.usersRepository.findOne({ id: id });
    console.log(user);

    return user;
  }
}
