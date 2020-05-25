import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CommentCreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}

class CommentCreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}

export class CommentCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly comment: string;

  @ApiProperty()
  @Type(() => CommentCreateUserDto)
  @ValidateNested()
  readonly user: CommentCreateUserDto;

  @ApiProperty()
  @Type(() => CommentCreatePostDto)
  @ValidateNested()
  readonly post: CommentCreatePostDto;
}
