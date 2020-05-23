import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Post } from '@/post/entities/post.entity';

define(Post, (faker: typeof Faker) => {
  const post = new Post();
  post.title = faker.lorem.sentence();
  post.content = faker.lorem.paragraph();

  return post;
});
