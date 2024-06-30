import { IsDate, IsString } from 'class-validator';

export class RescheduleAppointmentDto {
  @IsDate()
  newAppointmentDate: Date;

  @IsString()
  time: string;
}
