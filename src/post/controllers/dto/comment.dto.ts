import { Expose, Exclude, Type } from 'class-transformer';

import { UserDto } from '@/user/controllers/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CommentDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  comment: string;

  @Expose()
  @Type(() => UserDto)
  @ApiProperty({
    type: UserDto,
  })
  user: UserDto;
}
