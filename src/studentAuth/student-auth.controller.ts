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
import { CreateStudentDto } from 'src/studentAuth/dto';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from 'src/shared/dto';
import { AuthGuard, RefreshTokenGuard } from 'src/shared/guards';
import { Request } from 'express';
import { Public } from 'src/shared/decorators';

@ApiTags('StudentAuth')
@Controller('auth/student')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentAuthController {
  constructor(private readonly studentAuthService: StudentAuthService) {}

  /** API Endpoint for Student Registration */
  @ApiBadRequestResponse()
  @Public()
  @Post('signup')
  createStudent(@Body() signupDetails: CreateStudentDto) {
    return this.studentAuthService.createStudent(signupDetails);
  }

  /** This endpoint logs the student in */
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
  @UseGuards(AuthGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    await this.studentAuthService.logout(req.user['id']);
    return 'You have successfully logout of the system, see you soon!';
  }

  /** This endpoint is called when a user forgots his/her password */
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
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request) {
    const user = req.user;
    return this.studentAuthService.refreshToken(
      user['refreshToken'],
      user['payload'],
    );
  }
}
