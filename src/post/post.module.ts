import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostRepository } from '@/post/repositories/post.repository';
import { PostController } from '@/post/controllers/post.controller';
import { PostService } from '@/post/services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
