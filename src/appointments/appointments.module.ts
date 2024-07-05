import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities';
import { Student } from 'src/studentsAuth/entities';
import { DoctorEntity } from 'src/doctorsAuth/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Student, DoctorEntity])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
