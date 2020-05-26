import { Expose, Exclude, Type } from 'class-transformer';

import { PostDto } from '@/post/controllers/admin/dto/Post';
import { UserDto } from '@/user/controllers/admin/dto';

@Exclude()
export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  comment: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => PostDto)
  post: PostDto;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}

@Exclude()
export class CommentListDto {
  @Expose()
  @Type(() => CommentDto)
  data: CommentDto[];

  @Expose()
  count: number;

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  pageCount: number;
}