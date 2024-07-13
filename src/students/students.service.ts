import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateStudentDto } from '../studentAuth/dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/studentAuth/entities';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  logger: Logger;
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {
    this.logger = new Logger(StudentService.name);
  }
  findAll() {
    return `This action returns all students`;
  }

  getStudent(id: number) {
    const student = this.studentRepository.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  updateStudent(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  deactivateStudent(id: number) {
    return `This action updates a #${id} student`;
  }

  deleteStudent(id: number) {
    return `This action removes a #${id} student`;
  }
}
