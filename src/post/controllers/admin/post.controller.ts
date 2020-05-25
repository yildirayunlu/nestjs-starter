import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { Post } from '@/post/entities/post.entity';
import { PostService } from '@/post/services/post.service';
import {
  PostCreateDto,
  PostUpdateDto,
  PostListDto,
  PostDto,
} from '@/post/controllers/admin/dto/Post';

@Crud({
  model: {
    type: Post,
  },
  dto: {
    create: PostCreateDto,
    update: PostUpdateDto,
  },
  query: {
    alwaysPaginate: true,
    join: {
      user: {
        eager: true,
      },
      comments: {
        eager: true,
      },
      'comments.user': {
        eager: true,
        alias: 'comment_user',
      },
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
  serialize: {
    getMany: PostListDto,
    create: PostDto,
    update: PostDto,
  },
})
@ApiBearerAuth()
@Controller('admin/posts')
@ApiTags('admin-posts')
export class AdminPostController implements CrudController<Post> {
  constructor(public service: PostService) {}
}
