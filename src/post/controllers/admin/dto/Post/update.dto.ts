import { IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AdminPostUpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly id: number;
}

export class AdminPostUpdateDto {
  @ApiProperty()
  @IsOptional()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  readonly content: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => AdminPostUpdateUserDto)
  @ValidateNested()
  readonly user: AdminPostUpdateUserDto;
}
