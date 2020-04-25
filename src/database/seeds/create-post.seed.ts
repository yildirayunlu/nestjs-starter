import { Factory, Seeder } from 'typeorm-seeding';
import { Post } from '../../post/post.entity';

export default class CreatePosts implements Seeder {
  public async run(factory: Factory) {
    await factory(Post)().createMany(20);
  }
}
