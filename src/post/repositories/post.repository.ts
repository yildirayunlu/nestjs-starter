import { EntityRepository, Repository } from 'typeorm';

import { Post } from '@/post/entities/post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
