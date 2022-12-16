import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  repeat_password: string;
}
