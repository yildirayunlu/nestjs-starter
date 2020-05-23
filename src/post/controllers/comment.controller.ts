import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Comment } from '@/post/entities/comment.entity';
import { CommentService } from '@/post/services/comment.service';

@Crud({
  model: {
    type: Comment,
  },
  query: {
    alwaysPaginate: true,
    join: {
      post: {
        eager: true,
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
@Controller('comments')
export class CommentController implements CrudController<Comment> {
  constructor(public service: CommentService) {}
}
