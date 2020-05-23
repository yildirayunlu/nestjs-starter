import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '@/user/entities/user.entity';
import { Post } from '@/post/entities/post.entity';

export default class AdminUser implements Seeder {
  public async run(factory: Factory) {
    await factory(User)().create({
      email: 'admin@mail.com',
      plainPassword: 'password',
      posts: await factory(Post)().createMany(5),
    });
  }
}
