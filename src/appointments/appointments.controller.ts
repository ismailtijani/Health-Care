import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentQueryDto } from './dto';

@ApiTags('Appointments')
@UseGuards()
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  getAllAppointments(@Query() queryParams: AppointmentQueryDto) {
    return this.appointmentsService.getAllAppointments(queryParams);
  }

  @Get(':id')
  getAppointment(@Param('id') id: number) {
    return this.appointmentsService.getAppointment(id);
  }

  @Patch(':id/reschedule')
  reschedule(
    @Param('id') id: string,
    @Body() rescheduleDto: RescheduleAppointmentDto,
  ) {
    return this.appointmentsService.reschedule(+id, rescheduleDto);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.appointmentsService.cancel(+id);
  }
}
