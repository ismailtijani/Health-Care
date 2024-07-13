import { Module } from '@nestjs/common';
import { DoctorService } from './doctors.service';
import { DoctorController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/doctorsAuth/entities/doctor.entity';
import { HelperService, JwtHandler } from 'src/shared';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  controllers: [DoctorController],
  providers: [DoctorService, JwtHandler, HelperService, JwtService],
  exports: [DoctorService],
})
export class DoctorModule {}
