import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Appointment } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppoinmentStatus } from 'src/shared/constants';
import {
  AppointmentQueryDto,
  CreateAppointmentDto,
  RescheduleAppointmentDto,
} from './dto';
import { DatabaseExceptionFilter } from 'src/shared';
import { PaginatedResult } from 'src/shared/interfaces';
import { Student } from 'src/studentAuth/entities';
import { DoctorEntity } from 'src/doctorsAuth/entities/doctor.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
  ) {}

  async create(
    createAppointmentDetails: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { studentId, doctorId, appointmentDate } = createAppointmentDetails;

    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });
    if (!student)
      throw new NotFoundException(`Student with ID ${studentId} not found`);

    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });
    if (!doctor)
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);

    try {
      const appointment = this.appointmentRepository.create({
        student: { id: studentId } as Student,
        doctor: { id: doctorId } as DoctorEntity,
        appointmentDate,
        status: AppoinmentStatus.SCHEDULED,
      });
      return this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new DatabaseExceptionFilter(error);
    }
  }

  async getAllAppointments(
    queryParams: AppointmentQueryDto,
  ): Promise<PaginatedResult<Appointment>> {
    const { studentId, doctorId, status, startDate, endDate, page, limit } =
      queryParams;

    const query = this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.student', 'student')
      .leftJoinAndSelect('appointment.doctor', 'doctor_entity');

    if (studentId) {
      query.andWhere('appointment.student.id = :studentId', { studentId });
    }

    if (doctorId) {
      query.andWhere('appointment.doctor.id = :doctorId', { doctorId });
    }

    if (status) {
      query.andWhere('appointment.status = :status', { status });
    }

    if (startDate) {
      query.andWhere('appointment.appointmentDate >= :startDate', {
        startDate,
      });
    }

    if (endDate) {
      query.andWhere('appointment.appointmentDate <= :endDate', { endDate });
    }

    query.orderBy('appointment.appointmentDate', 'ASC');

    const total = await query.getCount();
    const appointments = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      data: appointments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getAppointment(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['student', 'doctor_entity'],
    });
    if (!appointment)
      throw new NotFoundException(`Appointment with ID ${id} not found`);

    return appointment;
  }

  async reschedule(
    id: number,
    newAppointmentDetails: RescheduleAppointmentDto,
  ): Promise<Appointment> {
    const { newAppointmentDate, time } = newAppointmentDetails;
    const appointment = await this.getAppointment(id);
    if (
      appointment.status === AppoinmentStatus.CANCELLED ||
      appointment.status === AppoinmentStatus.COMPLETED
    )
      throw new BadRequestException(
        `Cannot reschedule a ${appointment.status} appointment`,
      );

    appointment.appointmentDate = newAppointmentDate;
    appointment.time = time;
    appointment.status = AppoinmentStatus.RESCHEDULED;

    try {
      return this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new InternalServerErrorException('Error rescheduling appointment');
    }
  }

  async cancel(id: number): Promise<Appointment> {
    const appointment = await this.getAppointment(id);
    if (
      appointment.status === AppoinmentStatus.CANCELLED ||
      appointment.status === AppoinmentStatus.COMPLETED
    )
      throw new BadRequestException(
        `Cannot cancel a ${appointment.status} appointment`,
      );

    appointment.status = AppoinmentStatus.CANCELLED;
    try {
      return this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new InternalServerErrorException('Error cancelling appointment');
    }
  }
}
