import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Comment } from '@/post/entities/comment.entity';
import { CommentService } from '@/post/services/comment.service';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { RolesEnum } from '@/enums/roles.enum';
import {
  AdminCommentCreateDto,
  AdminCommentUpdateDto,
  AdminCommentGetManyDto,
  AdminCommentDto,
} from '@/post/controllers/admin/dto/Comment';

@ApiBearerAuth()
@ApiTags('admin-comments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Crud({
  model: {
    type: Comment,
  },
  dto: {
    create: AdminCommentCreateDto,
    update: AdminCommentUpdateDto,
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
    getManyBase: {
      decorators: [Roles(RolesEnum.ADMIN)],
    },
    getOneBase: {
      decorators: [Roles(RolesEnum.ADMIN)],
    },
    createOneBase: {
      decorators: [Roles(RolesEnum.ADMIN)],
    },
    deleteOneBase: {
      decorators: [Roles(RolesEnum.ADMIN)],
    },
  },
  serialize: {
    getMany: AdminCommentGetManyDto,
    create: AdminCommentDto,
    update: AdminCommentDto,
    get: AdminCommentDto,
  },
})
@Controller('admin/comments')
export class AdminCommentController implements CrudController<Comment> {
  constructor(public service: CommentService) {}
}
