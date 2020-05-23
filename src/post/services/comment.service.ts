import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Comment } from '@/post/entities/comment.entity';
import { CommentRepository } from '@/post/repositories/comment.repository';

@Injectable()
export class CommentService extends TypeOrmCrudService<Comment> {
  constructor(
    @InjectRepository(Comment) public readonly repo: CommentRepository,
  ) {
    super(repo);
  }
}
