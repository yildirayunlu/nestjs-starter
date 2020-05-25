import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { Comment } from '@/post/entities/comment.entity';
import { CommentService } from '@/post/services/comment.service';
import {
  CommentCreateDto,
  CommentUpdateDto,
  CommentListDto,
  CommentDto,
} from '@/post/controllers/admin/dto/Comment';

@Crud({
  model: {
    type: Comment,
  },
  dto: {
    create: CommentCreateDto,
    update: CommentUpdateDto,
  },
  query: {
    alwaysPaginate: true,
    join: {
      post: {
        eager: true,
      },
      user: {
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
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
  serialize: {
    getMany: CommentListDto,
    create: CommentDto,
    update: CommentDto,
  },
})
@ApiBearerAuth()
@Controller('admin/comments')
@ApiTags('admin-comments')
export class AdminCommentController implements CrudController<Comment> {
  constructor(public service: CommentService) {}
}
