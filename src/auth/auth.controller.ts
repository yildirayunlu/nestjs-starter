import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { RegisterDto, LoginDto } from './dto';
import { ApiUnauthorizedResponse } from './decorators';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly userService: UserService,
  ) {}

  @ApiOkResponse({
    description: 'Authorized',
    schema: {
      properties: {
        token: {
          type: 'string',
        },
      },
    },
  })
  @ApiUnauthorizedResponse()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOkResponse({
    type: User,
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { email, password } = registerDto;

    return this.userService.createUser(email, password, ['admin']);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: User,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req) {
    // find user
    const user = this.userService.findOneById(req.user.id);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
