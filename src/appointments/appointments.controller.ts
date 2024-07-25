import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentQueryDto } from './dto';
import { AuthGuard } from 'src/shared/guards';

@ApiTags('Appointments')
@Controller('appointments')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  /** API Endpoint for scheduling appoinments */
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  /** API Endpoint to fetch all appoinments */
  @Get()
  getAllAppointments(@Query() queryParams: AppointmentQueryDto) {
    return this.appointmentsService.getAllAppointments(queryParams);
  }

  /** API Endpoint to fetch a single appoinment */
  @Get(':id')
  getAppointment(@Param('id') id: number) {
    return this.appointmentsService.getAppointment(id);
  }

  /** API Endpoint to reschedule an appoinment */
  @Patch(':id/reschedule')
  reschedule(
    @Param('id') id: string,
    @Body() rescheduleDto: RescheduleAppointmentDto,
  ) {
    return this.appointmentsService.reschedule(+id, rescheduleDto);
  }

  /** API Endpoint to cancel an appoinment */
  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.appointmentsService.cancel(+id);
  }
}
