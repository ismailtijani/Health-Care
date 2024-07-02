import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { ApiTags } from '@nestjs/swagger';
import { DoctorAuthGuard } from 'src/doctorsAuth/guards';
import { Request } from 'express';

@ApiTags('Doctors')
@Controller('doctor')
@UseGuards(DoctorAuthGuard)
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get('profile')
  getDoctorProfile(@Req() req: Request) {
    return req.user;
  }
}
