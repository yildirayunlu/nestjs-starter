import { Expose, Exclude, Type } from 'class-transformer';

import { CommentDto } from '@/post/controllers/dto';
import { UserDto } from '@/user/controllers/dto';

@Exclude()
export class PostDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}

// TODO: Move global
@Exclude()
class PaginationDto {
  @Expose()
  totalItems: number;

  @Expose()
  itemCount: number;

  @Expose()
  itemsPerPage: number;

  @Expose()
  totalPages: number;

  @Expose()
  currentPage: number;
}

@Exclude()
export class PostListDto {
  @Expose({
    name: 'items',
  })
  @Type(() => PostDto)
  data: PostDto[];

  @Expose({
    name: 'meta',
  })
  @Type(() => PaginationDto)
  pagination: PaginationDto;
}
