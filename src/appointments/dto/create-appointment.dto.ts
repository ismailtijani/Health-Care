import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  /** @example 13/CIS/CS/451 */
  @IsNotEmpty()
  @IsString()
  studentId: string;

  /** @example 1 */
  @IsNotEmpty()
  @IsString()
  doctorId: string;

  /** @example 2024-06-29 */
  @IsDateString()
  @IsDate()
  appointmentDate: Date;

  /** @example '4:30 AM' */
  @IsNotEmpty()
  @IsString()
  time: string;

  /** @example 'I am having ankle pain' */
  @IsOptional()
  @IsString()
  complains: string;
}
