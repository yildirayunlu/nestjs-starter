import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '@/user/entities/user.entity';
import { Post } from '@/post/entities/post.entity';
import { Comment } from '@/post/entities/comment.entity';

export default class Posts implements Seeder {
  public async run(factory: Factory) {
    // #### Users ####
    await factory(User)().create({
      email: 'admin@mail.com',
      plainPassword: 'password',
      posts: [],
    });

    // test user - 1
    const user1 = await factory(User)().create({
      email: 'test1@mail.com',
      plainPassword: 'password',
      // posts: await factory(Post)().createMany(10),
    });

    // test user - 2
    const user2 = await factory(User)().create({
      email: 'test2@mail.com',
      plainPassword: 'password',
    });

    // test user - 3
    const user3 = await factory(User)().create({
      email: 'test3@mail.com',
      plainPassword: 'password',
    });

    // ### Posts ###
    await factory(Post)().create({
      user: user1,
      comments: [
        await factory(Comment)().create({
          user: user2,
        }),
        await factory(Comment)().create({
          user: user3,
        }),
      ],
    });
  }
}
