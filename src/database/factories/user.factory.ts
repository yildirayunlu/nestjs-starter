import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as crypto from 'crypto';

import { User } from '@/user/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.email = faker.internet.email().toLowerCase();
  user.password = crypto.createHmac('sha256', 'password').digest('hex');
  user.roles = ['user'];

  return user;
});
