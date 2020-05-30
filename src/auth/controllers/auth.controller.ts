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
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { AuthService } from '@/auth/services/auth.service';
import { UserService } from '@/user/services/user.service';
import {
  RegisterDto,
  LoginDto,
  AuthenticatedDto,
} from '@/auth/controllers/dto';
import { AuthenticatedUserDto } from '@/user/controllers/dto';
import { ExceptionDto } from '@/dto';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly userService: UserService,
  ) {}

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({
    status: 200,
    type: AuthenticatedDto,
    description: 'Login Success',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: ExceptionDto,
  })
  async login(@Body() loginDto: LoginDto, @Request() req) {
    const authUser = await this.authService.login(req.user);

    return plainToClass(AuthenticatedDto, authUser);
  }

  @HttpCode(200)
  @Post('register')
  @ApiResponse({
    status: 200,
    type: AuthenticatedDto,
    description: 'Register Success',
  })
  @ApiBadRequestResponse({
    description: 'Email already exist',
    type: ExceptionDto,
  })
  async register(@Body() registerDto: RegisterDto) {
    const { firstName, lastName, email, password } = registerDto;

    // check unique email
    if (await this.userService.findOneByEmail(email)) {
      throw new BadRequestException('User with the same email already exist');
    }

    // create user
    const user = await this.userService.createUser(
      firstName,
      lastName,
      email,
      password,
      ['user'],
    );

    // generate token
    const authUser = await this.authService.login(user);

    return plainToClass(AuthenticatedDto, authUser);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiResponse({
    status: 200,
    type: AuthenticatedUserDto,
    description: 'Success',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: ExceptionDto,
  })
  async me(@Request() req) {
    const user = await this.userService.findOneById(req.user.id);
    if (!user) throw new UnauthorizedException();

    return plainToClass(AuthenticatedUserDto, user);
  }
}
