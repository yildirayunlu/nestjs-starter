import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(6, 32)
  readonly password: string;
}
