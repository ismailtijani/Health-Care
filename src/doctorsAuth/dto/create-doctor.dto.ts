import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { DoctorSpecialization } from 'src/shared/constants';
export class CreateDoctorDto {
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
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  /** @example 080********35 */
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  /** @example Male */
  @IsNotEmpty()
  @IsString()
  gender: string;

  /** @example Gynecology */
  @IsEnum(DoctorSpecialization)
  specialization: DoctorSpecialization;

  /** @example 14/SC/4321 */
  @IsNotEmpty()
  @IsString()
  doctorId: string;
}
