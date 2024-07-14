import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DatabaseExceptionFilter,
  HelperService,
  JwtHandler,
  JwtPayload,
  Tokens,
} from 'src/shared';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from 'src/shared/dto';
import * as bcrypt from 'bcryptjs';
import { UserType } from 'src/shared/constants';
import { DoctorEntity } from '../entities/doctor.entity';
import { CreateDoctorDto } from '../dto';

@Injectable()
export class DoctorAuthService {
  logger: Logger;
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepositories: Repository<DoctorEntity>,
    // // Inject JTWService
    private readonly jwtService: JwtHandler,
    // Inject EmailService
    // private readonly emailService: EmailService,
    private readonly helperService: HelperService,
  ) {
    this.logger = new Logger(DoctorAuthService.name);
  }

  /* 
=======================================
User Registration Method
========================================
*/
  async createDoctor(doctorDetails: CreateDoctorDto) {
    let doctor: DoctorEntity;
    try {
      // Create a new doctor entity
      const newDoctor = this.doctorRepositories.create(doctorDetails);
      //Save the new user to database
      doctor = await this.doctorRepositories.save(newDoctor);
    } catch (error) {
      throw new DatabaseExceptionFilter(error);
    }
    // Generate JWT token payload
    const payload = {
      sub: doctor.id,
      email: doctor.email,
      userType: UserType.Doctor,
    };
    // Generate Tokens
    const { accessToken, refreshToken } =
      await this.jwtService.generateTokens(payload);
    await this.updateRefreshToken(payload.sub, refreshToken);

    // Send Welcome Email
    // this.emailService.sendUserWelcomeEmail(savedUser, '12345'); // Create a Dto and generate token

    return { doctor, accessToken, refreshToken };
  }

  /* 
=======================================
Doctor Login Method
========================================
*/
  async login(loginDetails: LoginDto) {
    const doctor = await this.findUserByCredentials(loginDetails);
    const payload = {
      sub: doctor.id,
      email: doctor.email,
      userType: UserType.Doctor,
    };

    // Generate Tokens
    const { accessToken, refreshToken } =
      await this.jwtService.generateTokens(payload);
    await this.updateRefreshToken(payload.sub, refreshToken);

    return { doctor, accessToken, refreshToken };
  }

  /* 
=======================================
Doctor LogOut Method
========================================
*/
  async logout(id: number) {
    try {
      await this.doctorRepositories.update(id, { refreshToken: null });
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
    const doctor = await this.doctorRepositories.findOneBy({ email });
    if (!doctor)
      throw new BadRequestException(
        'Reset instruction will be sent to only valid email!',
      );
    // Generate Reset Password Token
    const resetToken = await this.jwtService.generateResetToken(email);
    // Hash token and send to resetPassword token field
    const hashedToken = await this.helperService.hashData(resetToken);
    doctor.resetPasswordToken = hashedToken;

    try {
      await this.doctorRepositories.save(doctor);
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
    const doctor = await this.doctorRepositories.findOneBy({
      email: payload.sub,
    });
    if (
      !doctor &&
      (await bcrypt.compare(resetToken, doctor.resetPasswordToken))
    ) {
      throw new BadRequestException('Invalid Reset Password Token!!!');
    }

    try {
      doctor.password = newPassword;
      doctor.resetPasswordToken = null;
      this.doctorRepositories.save(doctor);
    } catch (error) {
      console.log(JSON.stringify(error));
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
    const doctor = await this.doctorRepositories.findOneBy({ id: payload.sub });

    if (
      doctor &&
      doctor.refreshToken &&
      (await bcrypt.compare(refreshToken, doctor.refreshToken))
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
  async findUserByCredentials({
    email,
    password,
  }: LoginDto): Promise<DoctorEntity> {
    // Find User by email
    const doctor = await this.doctorRepositories.findOneBy({ email });
    if (!doctor)
      throw new NotFoundException('User does not exist!, Kindly signup');
    // Validate password
    if (await bcrypt.compare(password, doctor.password)) {
      return doctor;
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
      await this.doctorRepositories.update({ id }, { refreshToken: hashedRt });
    } catch (error) {
      throw new DatabaseExceptionFilter(error);
    }
  }
}
