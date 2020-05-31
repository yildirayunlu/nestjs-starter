import { EntityRepository, Repository } from 'typeorm';

import { Post } from '@/post/entities/post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async findOneById(id: number): Promise<Post> {
    // TODO: Extra filter isActive etc.
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
