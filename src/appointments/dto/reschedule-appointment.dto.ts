import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RescheduleAppointmentDto {
  /** @example 2024-06-29 */
  @IsDateString()
  @IsDate()
  newAppointmentDate: Date;

  /** @example '4:30 AM' */
  @IsNotEmpty()
  @IsString()
  time: string;

  /** @example 'I am having ankle pain' */
  @IsOptional()
  @IsString()
  reason: string;
}
