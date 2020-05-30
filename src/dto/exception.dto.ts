import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ExceptionDto {
  @Expose()
  @ApiProperty()
  statusCode: number;

  @Expose()
  @ApiProperty()
  message: string;
}
