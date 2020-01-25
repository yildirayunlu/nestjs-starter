import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return undefined;
    }

    // check password
    if (user.password !== crypto.createHmac('sha256', password).digest('hex')) {
      return undefined;
    }

    return user;
  }

  async login(user: User) {
    return {
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
        roles: user.roles,
      }),
    };
  }
}