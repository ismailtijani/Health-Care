import { forwardRef, Module } from '@nestjs/common';
import { StudentController } from './students.controller';
import { StudentService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/studentAuth/entities';
import { HelperService, JwtHandler } from 'src/shared';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from 'src/doctors/doctors.service';
import { Reflector } from '@nestjs/core';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { DoctorModule } from 'src/doctors/doctors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, DoctorEntity]),
    forwardRef(() => DoctorModule),
  ],
  controllers: [StudentController],
  providers: [
    StudentService,
    JwtHandler,
    HelperService,
    JwtService,
    DoctorService,
    Reflector,
  ],
  exports: [StudentService],
})
export class StudentModule {}
