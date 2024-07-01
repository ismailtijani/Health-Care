import { Injectable } from '@nestjs/common';
import { UpdateStudentDto } from '../studentsAuth/dto/update-student.dto';

@Injectable()
export class StudentService {
  findAll() {
    return `This action returns all students`;
  }

  getStudent(id: number) {
    return `This action returns a #${id} student`;
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
