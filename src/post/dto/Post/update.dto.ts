import { IsOptional, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class User {
  @IsNumber()
  readonly id: number;
}

export class UpdateDto {
  @IsOptional()
  readonly title: string;

  @IsOptional()
  readonly content: string;

  @IsOptional()
  @Type(() => User)
  @ValidateNested()
  readonly user: User;
}
