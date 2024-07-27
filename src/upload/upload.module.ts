import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryService } from './cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { StudentService } from 'src/students/students.service';
import { DoctorService } from 'src/doctors/doctors.service';
import { Reflector } from '@nestjs/core';
import { Student } from 'src/studentAuth/entities';
import { JwtHandler } from 'src/shared';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity, Student])],
  controllers: [UploadController],
  providers: [
    UploadService,
    CloudinaryService,
    StudentService,
    JwtHandler,
    JwtService,
    DoctorService,
    Reflector,
  ],
})
export class UploadModule {}
