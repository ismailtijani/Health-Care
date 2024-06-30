import { Module } from '@nestjs/common';
import { StudentController } from './students.controller';
import { StudentService } from './students.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentsModule {}
