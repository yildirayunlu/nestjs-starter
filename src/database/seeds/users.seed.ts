import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '@/user/user.entity';
import { Post } from '@/post/post.entity';

export default class Users implements Seeder {
  public async run(factory: Factory) {
    await factory(User)()
      .map(
        async (user: User): Promise<User> => {
          const posts: Post[] = await factory(Post)().createMany(3);
          user.posts = posts;
          return user;
        },
      )
      .createMany(10);
  }
}
