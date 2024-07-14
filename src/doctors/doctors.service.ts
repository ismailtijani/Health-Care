import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
  ) {}
  async getDoctor(id: number) {
    const doctor = await this.doctorRepository.findOneBy({ id });
    if (!doctor) throw new UnauthorizedException('Doctor not found');
    return doctor;
  }
}
