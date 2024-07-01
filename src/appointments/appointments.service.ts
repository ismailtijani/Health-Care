import { Injectable } from '@nestjs/common';
import { Appointment } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppoinmentStatus } from 'src/shared/constants';
import { CreateAppointmentDto, RescheduleAppointmentDto } from './dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  async reschedule(
    id: number,
    newAppointmentDetails: RescheduleAppointmentDto,
  ): Promise<Appointment> {
    const { newAppointmentDate, time } = newAppointmentDetails;
    const appointment = await this.appointmentRepository.findOneBy({ id });
    appointment.appointmentDate = newAppointmentDate;
    appointment.time = time;
    appointment.status = AppoinmentStatus.RESCHEDULED;
    return this.appointmentRepository.save(appointment);
  }

  async cancel(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    appointment.status = AppoinmentStatus.CANCELLED;
    return this.appointmentRepository.save(appointment);
  }
}
