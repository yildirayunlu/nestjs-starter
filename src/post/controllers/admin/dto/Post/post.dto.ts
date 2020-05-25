import { Expose, Exclude, Type } from 'class-transformer';

import { UserDto } from '@/user/controllers/admin/dto';
import { CommentDto } from '@/post/controllers/admin/dto/Comment';

@Exclude()
export class PostDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto[];

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}

@Exclude()
export class PostListDto {
  @Expose()
  @Type(() => PostDto)
  data: PostDto[];

  @Expose()
  count: number;

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  pageCount: number;
}
