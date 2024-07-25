import { IsDateString, IsOptional, IsString } from 'class-validator';

export class RescheduleAppointmentDto {
  /** @example 2024-06-29 */
  @IsOptional()
  @IsDateString()
  newAppointmentDate: Date;

  /** @example '4:30 AM' */
  @IsOptional()
  @IsString()
  time: string;

  /** @example 'I am having ankle pain' */
  @IsOptional()
  @IsString()
  reason: string;
}
