import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DoctorService } from './doctors.service';
import { ApiTags } from '@nestjs/swagger';
import { DoctorAuthGuard } from 'src/doctorsAuth/guards';
import { Request } from 'express';

@ApiTags('Doctors')
@Controller('doctor')
@UseGuards(DoctorAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class DoctorController {
  constructor(private readonly doctorsService: DoctorService) {}

  @Get('profile')
  getDoctorProfile(@Req() req: Request) {
    return req.user;
  }
}
