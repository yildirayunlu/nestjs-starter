import { Expose, Exclude, Type } from 'class-transformer';

import { AdminUserDto } from '@/user/controllers/admin/dto';
import { AdminPostDto } from '@/post/controllers/admin/dto/Post';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AdminCommentDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  comment: string;

  @Expose()
  @Type(() => AdminUserDto)
  @ApiProperty({
    type: AdminUserDto,
  })
  user: AdminUserDto;

  @Expose()
  @Type(() => AdminPostDto)
  @ApiProperty({
    type: AdminPostDto,
  })
  post: AdminPostDto;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
