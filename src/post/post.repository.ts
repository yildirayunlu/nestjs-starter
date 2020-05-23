import { EntityRepository, Repository } from 'typeorm';

import { Post } from '@/post/post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
