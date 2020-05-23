import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Post } from '@/post/entities/post.entity';
import { PostService } from '@/post/services/post.service';

@Crud({
  model: {
    type: Post,
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
})
@Controller('posts')
export class PostController implements CrudController<Post> {
  constructor(public service: PostService) {}
}
