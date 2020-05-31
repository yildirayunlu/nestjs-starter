import { Expose, Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PostDto as BasePostDto, CommentDto } from '@/post/controllers/dto';

@Exclude()
export class PostDetailDto extends BasePostDto {
  @Expose()
  @Type(() => CommentDto)
  @ApiProperty({
    type: CommentDto,
  })
  comments: CommentDto[];
}
