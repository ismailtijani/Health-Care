import { Module } from '@nestjs/common';
import { StudentController } from './students.controller';
import { StudentService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/studentAuth/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
