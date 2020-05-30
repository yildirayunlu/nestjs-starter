import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import * as crypto from 'crypto';

import { User } from '@/user/entities/user.entity';
import { UserRepository } from '@/user/repositories/user.repository';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) public readonly repo: UserRepository) {
    super(repo);
  }

  /**
   * create user
   */
  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roles?: ['user'],
  ): Promise<User> {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = crypto.createHmac('sha256', password).digest('hex');
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
