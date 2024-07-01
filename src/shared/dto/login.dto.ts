import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  /** @example example@healthcare.com */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /** @example Password@123 */
  @IsString()
  @IsNotEmpty()
  password: string;
}
