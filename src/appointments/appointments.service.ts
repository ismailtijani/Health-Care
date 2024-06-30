import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';

@Injectable()
export class AppointmentsService {
  create(createAppointmentDto: CreateAppointmentDto) {
    return 'This action adds a new appointment';
  }

  reschedule(id: number, newAppointmentDetails: RescheduleAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  cancel(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
