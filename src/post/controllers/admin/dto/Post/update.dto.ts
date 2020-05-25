import { IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PostUpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly id: number;
}

export class PostUpdateDto {
  @ApiProperty()
  @IsOptional()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  readonly content: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => PostUpdateUserDto)
  @ValidateNested()
  readonly user: PostUpdateUserDto;
}
