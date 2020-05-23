import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostRepository } from '@/post/post.repository';
import { PostController } from '@/post/post.controller';
import { PostService } from '@/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
