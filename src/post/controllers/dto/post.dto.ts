import { Expose, Exclude, Type } from 'class-transformer';

import { UserDto } from '@/user/controllers/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PostDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @Type(() => UserDto)
  @ApiProperty({
    type: UserDto,
  })
  user: UserDto;
}
