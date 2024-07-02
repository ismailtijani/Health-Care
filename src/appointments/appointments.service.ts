import { Injectable, NotFoundException } from '@nestjs/common';
import { Appointment } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppoinmentStatus } from 'src/shared/constants';
import { CreateAppointmentDto, RescheduleAppointmentDto } from './dto';
import { DatabaseExceptionFilter } from 'src/shared';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    try {
      const appointment =
        this.appointmentRepository.create(createAppointmentDto);
      return this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new DatabaseExceptionFilter(error);
    }
  }

  async reschedule(
    id: number,
    newAppointmentDetails: RescheduleAppointmentDto,
  ): Promise<Appointment> {
    const { newAppointmentDate, time } = newAppointmentDetails;
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) throw new NotFoundException('Appoinment not found');

    appointment.appointmentDate = newAppointmentDate;
    appointment.time = time;
    appointment.status = AppoinmentStatus.RESCHEDULED;
    try {
      return this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new DatabaseExceptionFilter(error);
    }
  }

  async cancel(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) throw new NotFoundException('Appoinment not found');
    appointment.status = AppoinmentStatus.CANCELLED;
    try {
      return this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new DatabaseExceptionFilter(error);
    }
  }
}
