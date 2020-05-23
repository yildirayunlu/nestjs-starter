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
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from '@/auth/services/auth.service';
import { UserService } from '@/user/services/user.service';
import { RegisterDto, LoginDto } from '@/auth/dto';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // check unique email
    if (await this.userService.findOneByEmail(email)) {
      throw new BadRequestException('User with the same email already exist');
    }

    return this.userService.createUser(email, password, ['user']);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req) {
    // find user
    const user = this.userService.findOneById(req.user.id);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
