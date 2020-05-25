import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '@/decorators/roles.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import { Post } from '@/post/entities/post.entity';
import { PostService } from '@/post/services/post.service';
import { RolesEnum } from '@/enums/roles.enum';
import {
  PostCreateDto,
  PostUpdateDto,
  PostListDto,
  PostDto,
} from '@/post/controllers/admin/dto/Post';

@ApiBearerAuth()
@ApiTags('admin-posts')
@UseGuards(AuthGuard('jwt'), RolesGuard)
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
    getMany: PostListDto,
    create: PostDto,
    update: PostDto,
  },
})
@Controller('admin/posts')
export class AdminPostController implements CrudController<Post> {
  constructor(public service: PostService) {}
}
