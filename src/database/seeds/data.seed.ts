import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '@/user/entities/user.entity';
import { Post } from '@/post/entities/post.entity';
import { Comment } from '@/post/entities/comment.entity';

export default class Data implements Seeder {
  public async run(factory: Factory) {
    // #### Users ####
    await factory(User)().create({
      id: 1,
      email: 'admin@mail.com',
      plainPassword: 'password',
      roles: ['admin'],
      posts: [],
    });

    // test user - 2
    const user2 = await factory(User)().create({
      id: 2,
      email: 'test2@mail.com',
      plainPassword: 'password',
      roles: ['user'],
    });

    // test user - 3
    const user3 = await factory(User)().create({
      id: 3,
      email: 'test3@mail.com',
      plainPassword: 'password',
      roles: ['user'],
    });

    // test user - 4
    const user4 = await factory(User)().create({
      id: 4,
      email: 'test4@mail.com',
      plainPassword: 'password',
      roles: ['user'],
    });

    // ### Posts ###
    await factory(Post)().create({
      id: 1,
      user: user2,
      title: 'Test Title',
      content: 'Test Content',
      comments: [
        await factory(Comment)().create({
          user: user3,
        }),
        await factory(Comment)().create({
          user: user4,
        }),
      ],
    });

    await factory(Post)().create({
      id: 2,
      user: user2,
      comments: [
        await factory(Comment)().create({
          user: user3,
        }),
      ],
    });

    await factory(Post)().create({
      id: 3,
      user: user3,
      comments: [
        await factory(Comment)().create({
          user: user2,
        }),
      ],
    });

    await factory(Post)().create({
      id: 4,
      user: user4,
      comments: [
        await factory(Comment)().create({
          user: user3,
        }),
      ],
    });
  }
}
