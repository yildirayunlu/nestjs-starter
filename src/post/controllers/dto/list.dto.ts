import { Expose, Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PostDto as BasePostDto, CommentDto } from '@/post/controllers/dto';

@Exclude()
class PostItemDto extends BasePostDto {
  @Expose()
  @Type(() => CommentDto)
  @ApiProperty({
    type: CommentDto,
  })
  comments: CommentDto[];
}

@Exclude()
class PaginationDto {
  @Expose()
  @ApiProperty()
  totalItems: number;

  @Expose()
  @ApiProperty()
  itemCount: number;

  @Expose()
  @ApiProperty()
  itemsPerPage: number;

  @Expose()
  @ApiProperty()
  totalPages: number;

  @Expose()
  @ApiProperty()
  currentPage: number;
}

@Exclude()
export class PostListDto {
  @Expose({
    name: 'items',
  })
  @Type(() => PostItemDto)
  @ApiProperty({
    type: PostItemDto,
  })
  data: PostItemDto[];

  @Expose({
    name: 'meta',
  })
  @Type(() => PaginationDto)
  @ApiProperty({
    type: PaginationDto,
  })
  pagination: PaginationDto;
}
