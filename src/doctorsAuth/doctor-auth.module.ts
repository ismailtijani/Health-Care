import { Module } from '@nestjs/common';
import { DoctorAuthService } from './doctor-auth.service';
import { DoctorAuthController } from './doctor-auth.controller';
import { HelperService, JwtHandler } from 'src/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { JwtService } from '@nestjs/jwt';
import { DoctorJwtStrategy } from './strategies/strategy';
import { RtStrategy } from 'src/shared/strategies';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  controllers: [DoctorAuthController],
  providers: [
    DoctorAuthService,
    JwtHandler,
    HelperService,
    JwtService,
    DoctorJwtStrategy,
    RtStrategy,
  ],
})
export class DoctorAuthModule {}
