import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

import { Post } from '@/post/entities/post.entity';
import { PostService } from '@/post/services/post.service';
import { CreateDto, UpdateDto } from '@/post/dto/Post';

@Crud({
  model: {
    type: Post,
  },
  dto: {
    create: CreateDto,
    update: UpdateDto,
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
})
@Controller('posts')
@ApiTags('posts')
export class PostController implements CrudController<Post> {
  constructor(public service: PostService) {}
}
