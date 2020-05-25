import { Expose, Exclude, Type } from 'class-transformer';

import { UserDto } from '@/user/controllers/dto';

@Exclude()
export class CommentDto {
  @Expose()
  id: string;

  @Expose()
  comment: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
