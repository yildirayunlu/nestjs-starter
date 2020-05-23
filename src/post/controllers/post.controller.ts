import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostService } from '@/post/services/post.service';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(public service: PostService) {}

  @Get()
  async list() {
    // TODO: Public post list.
  }
}
