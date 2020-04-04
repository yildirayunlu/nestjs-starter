import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
