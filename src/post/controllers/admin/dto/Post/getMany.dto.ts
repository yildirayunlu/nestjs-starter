import { Expose, Exclude, Type } from 'class-transformer';

import { AdminPostDto } from '@/post/controllers/admin/dto/Post';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AdminPostGetManyDto {
  @Expose()
  @Type(() => AdminPostDto)
  @ApiProperty({
    type: AdminPostDto,
  })
  data: AdminPostDto[];

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
