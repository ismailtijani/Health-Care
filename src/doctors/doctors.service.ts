import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  private logger: Logger;
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
  ) {
    this.logger = new Logger(DoctorService.name);
  }

  /*
=======================================
A Method to get A Doctor by ID
========================================
*/
  async getDoctor(id: number): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOneBy({ id });
    if (!doctor) throw new NotFoundException(`Doctor with id ${id} not found`);
    return doctor;
  }

  /*
=======================================
A Method to get All Doctors
========================================
*/
  async getAllDoctors(): Promise<DoctorEntity[]> {
    return this.doctorRepository.find();
  }
}
