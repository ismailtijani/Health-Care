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
import { Request } from 'express';
import { JwtAuthGuard } from 'src/shared/guards';

@ApiTags('Doctors')
@UseGuards(JwtAuthGuard)
@Controller('doctor')
@UseInterceptors(ClassSerializerInterceptor)
export class DoctorController {
  constructor(private readonly doctorsService: DoctorService) {}

  @Get('profile')
  getDoctorProfile(@Req() req: Request) {
    return req.user;
  }
}
