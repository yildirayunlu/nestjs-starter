import { IsNumber, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AdminCommentUpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly id: number;
}

class AdminCommentUpdatePostDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly id: number;
}

export class AdminCommentUpdateDto {
  @ApiProperty()
  @IsOptional()
  readonly comment: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => AdminCommentUpdateUserDto)
  @ValidateNested()
  readonly user: AdminCommentUpdateUserDto;

  @ApiProperty()
  @IsOptional()
  @Type(() => AdminCommentUpdatePostDto)
  @ValidateNested()
  readonly post: AdminCommentUpdatePostDto;
}
