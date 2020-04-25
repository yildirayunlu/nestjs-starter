import {
  Controller,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiUnauthorizedResponse } from '@/decorators/ApiResponse';

@ApiTags('user')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(public service: UserService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: [User],
  })
  @ApiUnauthorizedResponse()
  @Get()
  async list(): Promise<User[]> {
    return this.service.repo.find();
  }
}
