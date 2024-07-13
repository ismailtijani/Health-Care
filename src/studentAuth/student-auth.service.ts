import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DatabaseExceptionFilter,
  HelperService,
  JwtHandler,
  JwtPayload,
  Tokens,
} from 'src/shared';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from 'src/shared/dto';
import { CreateStudentDto } from 'src/studentAuth/dto';
import { Student } from 'src/studentAuth/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserType } from 'src/shared/constants';

@Injectable()
export class StudentAuthService {
  private logger: Logger;
  constructor(
    // Inject TypeORM repository into the service class to enable interaction with the database
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    // // Inject JTWService
    private readonly jwtService: JwtHandler,
    // Inject EmailService
    // private readonly emailService: EmailService,
    private readonly helperService: HelperService,
  ) {
    this.logger = new Logger(StudentAuthService.name);
  }

  /*
=======================================
User Registration Method
========================================
*/
  async createStudent(studentDetails: CreateStudentDto) {
    let savedStudent: Student;
    try {
      // Create a new user entity
      const newStudent = this.studentRepository.create(studentDetails);
      //Save the new user to database
      savedStudent = await this.studentRepository.save(newStudent);
    } catch (error) {
      throw new DatabaseExceptionFilter(error);
    }
    // Generate JWT token payload
    const payload = {
      sub: savedStudent.id,
      email: savedStudent.email,
      userType: UserType.Student,
    };
    // Generate Tokens
    const { accessToken, refreshToken } =
      await this.jwtService.generateTokens(payload);
    await this.updateRefreshToken(payload.sub, refreshToken);

    // Send Welcome Email
    // this.emailService.sendUserWelcomeEmail(savedUser, '12345'); // Create a Dto and generate token

    return { savedStudent, accessToken, refreshToken };
  }

  /*
=======================================
User Login Method
========================================
*/
  async login(loginDetails: LoginDto) {
    const student = await this.findUserByCredentials(loginDetails);
    const payload = {
      sub: student.id,
      email: student.email,
      userType: UserType.Student,
    };
    // Generate Tokens
    const { accessToken, refreshToken } =
      await this.jwtService.generateTokens(payload);
    await this.updateRefreshToken(payload.sub, refreshToken);

    return { student, accessToken, refreshToken };
  }

  /*
=======================================
User LogOut Method
========================================
*/

  async logout(id: number) {
    try {
      await this.studentRepository.update(id, { refreshToken: null });
    } catch (error) {
      throw new DatabaseExceptionFilter(error);
    }
  }

  /*
=======================================
Password Recovery Method
========================================
*/

  forgotPassowrd = async (details: ForgotPasswordDto) => {
    const { email } = details;
    const student = await this.studentRepository.findOneBy({ email });
    if (!student)
      throw new BadRequestException(
        'Reset instruction will be sent to only valid email!',
      );
    // Generate Reset Password Token
    const resetToken = await this.jwtService.generateResetToken(email);
    // Hash token and send to resetPassword token field
    const hashedToken = await this.helperService.hashData(resetToken);
    student.resetPasswordToken = hashedToken;

    try {
      await this.studentRepository.save(student);
    } catch (error) {
      throw new DatabaseExceptionFilter(error);
    }

    // this.emailService.sendPasswordRecoveryEmail({
    //   email,
    //   name: user.name,
    //   resetToken,
    // });
    return 'Password recovery link has been sent your your email, Kindly check your mail';
  };

  /*
=======================================
Password Reset Method
========================================
*/
  async resetPassword(resetData: ResetPasswordDto) {
    const { resetToken, newPassword, confirmPassword } = resetData;
    //Compare passwords
    if (newPassword !== confirmPassword)
      throw new BadRequestException('Password must be the same');
    //Verify Token
    const payload = await this.jwtService.verifyToken(resetToken);
    const student = await this.studentRepository.findOneBy({
      email: payload.sub,
    });
    if (
      !student &&
      (await bcrypt.compare(resetToken, student.resetPasswordToken))
    ) {
      throw new BadRequestException('Invalid Reset Password Token!!!');
    }

    try {
      student.password = newPassword;
      student.resetPasswordToken = null;
      this.studentRepository.save(student);
    } catch (error) {
      this.logger.log(JSON.stringify(error));
      throw new InternalServerErrorException();
    }
    return 'Your Password has been reset successfully, Kindly login with your new password';
  }

  /*
=======================================
Refresh Token Method
========================================
*/
  async refreshToken(
    refreshToken: string,
    payload: JwtPayload,
  ): Promise<Tokens> {
    const student = await this.studentRepository.findOneBy({ id: payload.sub });

    if (
      student &&
      student.refreshToken &&
      (await bcrypt.compare(refreshToken, student.refreshToken))
    ) {
      const { accessToken, refreshToken } =
        await this.jwtService.generateTokens(payload);
      await this.updateRefreshToken(payload.sub, refreshToken);
      return { accessToken, refreshToken };
    }
    throw new ForbiddenException('Access Denied!!!');
  }

  /*
=======================================
Find User by credentials
========================================
*/
  async findUserByCredentials({ email, password }: LoginDto): Promise<Student> {
    // Find User by email
    const student = await this.studentRepository.findOneBy({ email });
    if (!student)
      throw new NotFoundException('User does not exist!, Kindly signup');
    // Validate password
    if (await bcrypt.compare(password, student.password)) {
      return student;
    } else {
      throw new BadRequestException(
        'Invalid Email or Password, Please check your login credentials',
      );
    }
  }

  /*
=======================================
Update Refresh Token
========================================
*/
  async updateRefreshToken(id: number, refreshToken: string) {
    // Hash refreshToken and store in the database
    const hashedRt = await this.helperService.hashData(refreshToken);
    try {
      await this.studentRepository.update({ id }, { refreshToken: hashedRt });
    } catch (error) {
      throw new DatabaseExceptionFilter(error);
    }
  }
}
