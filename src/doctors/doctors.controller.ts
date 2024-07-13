import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { DoctorService } from './doctors.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Doctors')
@Controller('doctor')
@UseInterceptors(ClassSerializerInterceptor)
export class DoctorController {
  constructor(private readonly doctorsService: DoctorService) {}

  @Get(':id')
  getDoctor(@Param('id') id: number) {
    return this.doctorsService.getDoctor(id);
  }
  @Get('profile')
  getDoctorProfile(@Req() req: Request) {
    return req.user;
  }
}
