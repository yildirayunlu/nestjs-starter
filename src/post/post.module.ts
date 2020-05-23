import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from '@/post/controllers/post.controller';
import { CommentController } from '@/post/controllers/comment.controller';
import { PostService } from '@/post/services/post.service';
import { CommentService } from '@/post/services/comment.service';
import { PostRepository } from '@/post/repositories/post.repository';
import { CommentRepository } from './repositories/comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, CommentRepository])],
  providers: [PostService, CommentService],
  exports: [PostService, CommentService],
  controllers: [PostController, CommentController],
})
export class PostModule {}
