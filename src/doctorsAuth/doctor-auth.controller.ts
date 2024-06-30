import { Controller } from '@nestjs/common';
import { DoctorAuthService } from './doctor-auth.service';

@Controller('doctor-auth')
export class DoctorAuthController {
  constructor(private readonly doctorAuthService: DoctorAuthService) {}
}
