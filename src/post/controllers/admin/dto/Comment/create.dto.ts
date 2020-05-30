import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AdminCommentCreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}

class AdminCommentCreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}

export class AdminCommentCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly comment: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => AdminCommentCreateUserDto)
  @ValidateNested()
  readonly user: AdminCommentCreateUserDto;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => AdminCommentCreatePostDto)
  @ValidateNested()
  readonly post: AdminCommentCreatePostDto;
}
