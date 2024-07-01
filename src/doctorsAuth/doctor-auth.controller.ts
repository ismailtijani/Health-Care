import { Body, Controller, Post } from '@nestjs/common';
import { DoctorAuthService } from './doctor-auth.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { LoginDto } from 'src/shared/dto';

@Controller('auth/doctor')
export class DoctorAuthController {
  constructor(private readonly doctorAuthService: DoctorAuthService) {}

  @Post()
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorAuthService.createDoctor(createDoctorDto);
  }

  @Post()
  login(@Body() loginDetails: LoginDto) {
    return this.doctorAuthService.login(loginDetails);
  }
}
