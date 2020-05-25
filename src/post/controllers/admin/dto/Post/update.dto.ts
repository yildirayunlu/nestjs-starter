import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PostUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}

export class PostUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @Type(() => PostUserDto)
  @ValidateNested()
  readonly user: PostUserDto;
}
