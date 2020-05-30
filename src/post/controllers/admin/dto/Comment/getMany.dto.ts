import { Expose, Exclude, Type } from 'class-transformer';

import { AdminCommentDto } from '@/post/controllers/admin/dto/Comment';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AdminCommentGetManyDto {
  @Expose()
  @Type(() => AdminCommentDto)
  @ApiProperty({
    type: AdminCommentDto,
  })
  data: AdminCommentDto[];

  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @ApiProperty()
  total: number;

  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  pageCount: number;
}
