import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class User {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}

export class CreateDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;

  @Type(() => User)
  @ValidateNested()
  readonly user: User;
}
