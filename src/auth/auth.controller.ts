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

// services
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { RegisterDto } from './dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { email, password } = registerDto;

    return this.userService.createUser(email, password, ['admin']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req) {
    // find user
    const user = this.userService.findOneById(req.user.id);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
