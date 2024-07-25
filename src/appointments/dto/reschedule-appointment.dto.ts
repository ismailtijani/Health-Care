import { IsDateString, IsOptional, IsString } from 'class-validator';

export class RescheduleAppointmentDto {
  /** @example 2024-07-25T10:30:00.000Z */
  @IsOptional()
  @IsDateString()
  newAppointmentDate: Date;

  /** @example '10:30:45 */
  @IsOptional()
  @IsString()
  time: string;

  /** @example 'I am having ankle pain' */
  @IsOptional()
  @IsString()
  reason: string;
}
