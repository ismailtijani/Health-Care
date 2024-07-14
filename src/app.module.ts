import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctors/doctors.module';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Student } from './studentAuth/entities';
import { AdminModule } from './admin/admin.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DoctorEntity } from './doctors/entities/doctor.entity';
import { Appointment } from './appointments/entities';
import { StudentModule } from './students/students.module';
import { StudentAuthModule } from './studentAuth/student-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        // envFilePath: './env/prod.env',
        process.env.NODE_ENV === 'production'
          ? './env/prod.env'
          : './env/dev.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Student, DoctorEntity, Appointment],
        synchronize: true,
      }),
    }),
    StudentModule,
    StudentAuthModule,
    DoctorModule,
    EmailModule,
    AdminModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
