import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

import { Comment } from '@/post/entities/comment.entity';
import { CommentService } from '@/post/services/comment.service';
import { CreateDto, UpdateDto } from '@/post/dto/Comment';

@Crud({
  model: {
    type: Comment,
  },
  dto: {
    create: CreateDto,
    update: UpdateDto,
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
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('comments')
@ApiTags('comments')
export class CommentController implements CrudController<Comment> {
  constructor(public service: CommentService) {}
}