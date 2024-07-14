import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UpdateStudentDto } from '../studentAuth/dto/update-student.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from './students.service';
import { AuthGuard } from 'src/shared/guards';

@ApiTags('Student')
@Controller('student')
@UseGuards(AuthGuard)
export class StudentController {
  constructor(private readonly studentsService: StudentService) {}

  /** API Endpoint for retrieving Student information. */
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getStudentProfile(@Req() req: Request) {
    return req.user;
  }

  /** API Endpoint for retrieving all registered Students. */
  @Get()
  getAllStudents() {
    return this.studentsService.findAll();
  }

  /** API Endpoint for retrieving Student information by ID. */
  @Get(':id')
  getStudent(@Param('id') id: string) {
    return this.studentsService.getStudent(+id);
  }

  /** API Endpoint for updating Student information.
   * @param updateStudentDto
   */
  @Patch(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.updateStudent(+id, updateStudentDto);
  }

  /** API Endpoint for updating Student information. */
  @Patch(':id')
  deactivateStudent(@Param('id') id: string) {
    return this.studentsService.deactivateStudent(+id);
  }

  /** API Endpoint for deactivating Student account. */
  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentsService.deleteStudent(+id);
  }
}
