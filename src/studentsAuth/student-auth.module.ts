import { Module } from '@nestjs/common';
import { StudentAuthService } from './student-auth.service';
import { StudentAuthController } from './student-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperService, JwtHandler } from 'src/shared';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Student } from './entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RtStrategy } from 'src/shared/strategies';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
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
    JwtHandler,
    JwtStrategy,
    RtStrategy,
    HelperService,
    JwtService,
  ],
})
export class StudentAuthModule {}
