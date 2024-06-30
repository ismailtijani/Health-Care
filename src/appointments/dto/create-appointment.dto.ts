import {
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsTimeZone,
} from 'class-validator';

export class CreateAppointmentDto {
  /** @example Rahmat */
  @IsNotEmpty()
  @IsString()
  name: string;

  /** @example example@gmail.com */
  @IsEmail()
  email: string;

  /** @example 2024-06-29 */
  @IsDate()
  date: Date;

  /** @example 080********35 */
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  /** @example 14:30:00 */
  @IsNotEmpty()
  @IsString()
  @IsTimeZone()
  time: string;

  /** @example 13/EG/AE/371 */
  @IsNotEmpty()
  @IsAlphanumeric()
  matricNumber: string;

  /** @example 'Computer Science */
  @IsNotEmpty()
  @IsString()
  department: string;

  /** @example 1 */
  @IsNotEmpty()
  @IsString()
  doctorId: string;
}
