import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Comment } from '@/post/entities/comment.entity';

define(Comment, (faker: typeof Faker) => {
  const comment = new Comment();
  comment.comment = faker.lorem.paragraph();

  return comment;
});
