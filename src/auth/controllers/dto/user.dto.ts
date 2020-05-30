import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { AuthenticatedUserDto } from '@/user/controllers/dto';

@Exclude()
export class AuthenticatedDto {
  @Expose()
  @ApiProperty()
  token: string;

  @Expose()
  @Type(() => AuthenticatedUserDto)
  @ApiProperty({
    type: AuthenticatedUserDto,
  })
  user: AuthenticatedUserDto;
}
