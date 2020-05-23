import { EntityRepository, Repository } from 'typeorm';

import { Comment } from '@/post/entities/comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {}
