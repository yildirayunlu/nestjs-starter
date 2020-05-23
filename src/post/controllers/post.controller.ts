import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Post } from '@/post/entities/post.entity';
import { PostService } from '@/post/services/post.service';

@Crud({
  model: {
    type: Post,
  },
  query: {
    join: {
      user: {
        eager: true,
      },
    },
  },
})
@Controller('posts')
export class PostController implements CrudController<Post> {
  constructor(public service: PostService) {}
}