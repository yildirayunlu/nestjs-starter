import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PostCreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}

export class PostCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => PostCreateUserDto)
  @ValidateNested()
  readonly user: PostCreateUserDto;
}
