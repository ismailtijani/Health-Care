import { Module } from '@nestjs/common';
import { DoctorAuthService } from './doctor-auth.service';
import { DoctorAuthController } from './doctor-auth.controller';

@Module({
  controllers: [DoctorAuthController],
  providers: [DoctorAuthService],
})
export class DoctorAuthModule {}
