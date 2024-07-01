import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/doctorsAuth/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
