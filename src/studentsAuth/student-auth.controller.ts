import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StudentAuthService } from './student-auth.service';
import { CreateStudentDto } from 'src/studentsAuth/dto';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from 'src/shared/dto';
import { JwtGuard } from 'src/shared/guards';
import { Request } from 'express';

@Controller('auth/student')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentAuthController {
  constructor(private readonly studentAuthService: StudentAuthService) {}

  /** API Endpoint for Student Registration */
  @ApiBadRequestResponse()
  @Post('signup')
  createStudent(@Body() signupDetails: CreateStudentDto) {
    return this.studentAuthService.createStudent(signupDetails);
  }

  /**
   * This endpoint logs the student in
   * a 401 error is thrown if endpoint doesn't exist
   * @param loginDetails
   */
  @ApiUnauthorizedResponse({
    description:
      'Invalid Email or Password, Please check your login credentials',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDetails: LoginDto) {
    return this.studentAuthService.login(loginDetails);
  }

  /** API Endpoint to Logout Student */
  @Get('logout')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    await this.studentAuthService.logout(req.user['id']);
    return 'You have successfully logout of the system, see you soon!';
  }

  /**
   * This endpoint is  called when a user forgots his/her password
   * @param forgotPasswordData
   */
  @Post('password/forgot')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() forgotPasswordData: ForgotPasswordDto) {
    return this.studentAuthService.forgotPassowrd(forgotPasswordData);
  }

  /**
   * This endpoint is called when a user wants to reset his/her password
   * @param resetData
   */
  @Post('password/reset')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetData: ResetPasswordDto) {
    return this.studentAuthService.resetPassword(resetData);
  }

  /** API Endpoint to get Refresh Tokens */
  @Get('refresh-token')
  // @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request) {
    const user = req.user;
    return this.studentAuthService.refreshToken(
      user['refreshToken'],
      user['payload'],
    );
  }
}
