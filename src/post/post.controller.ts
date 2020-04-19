import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Post } from './post.entity';
import { PostService } from './post.service';

@Crud({
  model: {
    type: Post,
  },
})
@Controller('posts')
export class PostController implements CrudController<Post> {
  constructor(public service: PostService) {}
}