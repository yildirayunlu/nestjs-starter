import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Post])],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
