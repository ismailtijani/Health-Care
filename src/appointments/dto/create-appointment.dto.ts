import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  /** @example 4 */
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  /** @example 1 */
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  /** @example 2024-06-29 */
  @IsDateString()
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
