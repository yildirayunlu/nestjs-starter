import { Expose, Exclude, Type } from 'class-transformer';

import { AdminUserDto } from '@/user/controllers/admin/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AdminPostDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @Type(() => AdminUserDto)
  @ApiProperty({
    type: AdminUserDto,
  })
  user: AdminUserDto[];

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;
}
