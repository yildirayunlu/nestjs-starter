import { IsNumber, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CommentUpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly id: number;
}

class CommentUpdatePostDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly id: number;
}

export class CommentUpdateDto {
  @ApiProperty()
  @IsOptional()
  readonly comment: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => CommentUpdateUserDto)
  @ValidateNested()
  readonly user: CommentUpdateUserDto;

  @ApiProperty()
  @IsOptional()
  @Type(() => CommentUpdatePostDto)
  @ValidateNested()
  readonly post: CommentUpdatePostDto;
}
