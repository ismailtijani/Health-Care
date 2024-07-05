import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateStudentDto {
  /** @example Rahmat */
  @IsNotEmpty()
  @IsString()
  firstName: string;

  /** @example Umar */
  @IsNotEmpty()
  @IsString()
  lastName: string;

  /** @example example@gmail.com */
  @IsEmail()
  email: string;

  /** @example Password@123 */
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
    },
  )
  password: string;

  /** @example 080********35 */
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  /** @example Male */
  @IsNotEmpty()
  @IsString()
  gender: string;

  /** @example 'Computer Science */
  @IsNotEmpty()
  @IsString()
  department: string;

  /** @example Science */
  @IsNotEmpty()
  @IsString()
  faculty: string;
}
