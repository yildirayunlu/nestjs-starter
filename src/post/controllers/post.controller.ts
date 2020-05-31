import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { PostService } from '@/post/services/post.service';
import { PostListDto, PostDetailDto } from '@/post/controllers/dto';
import { ExceptionDto } from '@/dto';

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
  @ApiResponse({
    status: 200,
    type: PostListDto,
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

  @ApiResponse({
    status: 200,
    type: PostListDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    type: ExceptionDto,
    description: 'Post Not Found',
  })
  @Get(':id')
  async detail(@Param('id') id: number) {
    const post = await this.service.repo.findOneById(id);

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    return plainToClass(PostDetailDto, post);
  }
}
