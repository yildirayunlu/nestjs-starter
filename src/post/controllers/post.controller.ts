import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { PostService } from '@/post/services/post.service';
import { PostListDto } from '@/post/controllers/dto';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(public service: PostService) {}

  @ApiQuery({
    name: 'page',
    type: 'number',
    schema: {
      default: 1,
    },
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    schema: {
      default: 20,
    },
  })
  @Get()
  async list(@Query('page') page = 1, @Query('limit') limit = 20) {
    const data = await this.service.paginate({
      page,
      limit,
      route: '/posts',
    });

    return plainToClass(PostListDto, data);
  }
}
