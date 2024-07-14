import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities';
import { Student } from 'src/studentAuth/entities';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from 'src/doctors/doctors.service';
import { Reflector } from '@nestjs/core';
import { HelperService, JwtHandler } from 'src/shared';
import { StudentService } from 'src/students/students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Student, DoctorEntity])],
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    StudentService,
    JwtHandler,
    HelperService,
    JwtService,
    DoctorService,
    Reflector,
  ],
})
export class AppointmentsModule {}
