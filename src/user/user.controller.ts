import {
  Controller,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// entities
import { User } from './user.entity';

// services
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(public service: UserService) {}

  @Get()
  async list(): Promise<User[]> {
    return this.service.repo.find();
  }
}
