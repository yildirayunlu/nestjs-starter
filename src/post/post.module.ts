import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from '@/post/controllers/post.controller';
import { AdminPostController } from '@/post/controllers/admin/post.controller';
import { AdminCommentController } from '@/post/controllers/admin/comment.controller';
import { PostService } from '@/post/services/post.service';
import { CommentService } from '@/post/services/comment.service';
import { PostRepository } from '@/post/repositories/post.repository';
import { CommentRepository } from './repositories/comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, CommentRepository])],
  providers: [PostService, CommentService],
  exports: [PostService, CommentService],
  controllers: [PostController, AdminPostController, AdminCommentController],
})
export class PostModule {}
