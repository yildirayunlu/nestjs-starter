import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Post } from '../../post/post.entity';

define(Post, (faker: typeof Faker) => {
  const post = new Post();
  post.title = faker.lorem.text();
  post.content = faker.lorem.paragraphs(3);

  return post;
});
