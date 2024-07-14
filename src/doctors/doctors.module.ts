import { forwardRef, Module } from '@nestjs/common';
import { DoctorService } from './doctors.service';
import { DoctorController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { HelperService, JwtHandler } from 'src/shared';
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/studentAuth/entities';
import { Reflector } from '@nestjs/core';
import { StudentModule } from 'src/students/students.module';
import { StudentService } from 'src/students/students.service';
import { DoctorAuthService } from './auth/doctor-auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorEntity, Student]),
    forwardRef(() => StudentModule),
  ],
  controllers: [DoctorController],
  providers: [
    DoctorService,
    DoctorAuthService,
    JwtHandler,
    HelperService,
    JwtService,
    Reflector,
    StudentService,
  ],
  exports: [DoctorService],
})
export class DoctorModule {}
