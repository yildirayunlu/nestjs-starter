import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService extends TypeOrmCrudService<Post> {
  constructor(@InjectRepository(Post) public readonly repo: PostRepository) {
    super(repo);
  }
}
