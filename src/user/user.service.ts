import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) public readonly repo: Repository<User>) {
    super(repo);
  }

  /**
   * create user
   */
  async createUser(
    email: string,
    password: string,
    roles?: ['admin' | 'member'],
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.plainPassword = password;
    user.roles = roles;

    return this.repo.save(user);
  }

  /**
   * find user by email address
   */
  async findOneByEmail(email: string): Promise<User> {
    return this.repo.findOne({ where: { email } });
  }

  /**
   * find user by id address
   */
  async findOneById(id: number): Promise<User> {
    return this.repo.findOne({ where: { id } });
  }
}