import {
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

  /** @example 2024-07-25T10:30:00.000Z */
  @IsDateString()
  appointmentDate: Date;

  /** @example 10:30:45 */
  @IsNotEmpty()
  @IsString()
  time: string;

  /** @example 'I am having ankle pain' */
  @IsOptional()
  @IsString()
  complains: string;
}
