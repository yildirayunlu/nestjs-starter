import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as crypto from 'crypto';

import { User } from '@/user/entities/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email().toLowerCase();
  user.password = crypto.createHmac('sha256', 'password').digest('hex');
  user.roles = ['user'];

  return user;
});
