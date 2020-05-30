import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { Post } from '@/post/entities/post.entity';
import { PostRepository } from '@/post/repositories/post.repository';

@Injectable()
export class PostService extends TypeOrmCrudService<Post> {
  constructor(@InjectRepository(Post) public readonly repo: PostRepository) {
    super(repo);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Post>> {
    return paginate<Post>(this.repo, options);
  }
}
