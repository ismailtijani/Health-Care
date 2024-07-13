import { Module } from '@nestjs/common';
import { StudentAuthController } from './student-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperService, JwtHandler } from 'src/shared';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Student } from './entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { DoctorService } from 'src/doctors/doctors.service';
import { DoctorEntity } from 'src/doctorsAuth/entities/doctor.entity';
import { StudentService } from 'src/students';
import { StudentAuthService } from './student-auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, DoctorEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        global: true,
        secret: ConfigService.get<string>('SECRET'),
        signOptions: { expiresIn: 60 * 15 },
      }),
    }),
    PassportModule,
  ],
  controllers: [StudentAuthController],
  providers: [
    StudentAuthService,
    StudentService,
    JwtHandler,
    HelperService,
    JwtService,
    DoctorService,
    Reflector,
  ],
})
export class StudentAuthModule {}
