import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';

export class updateDoctor extends PartialType(CreateDoctorDto) {}
