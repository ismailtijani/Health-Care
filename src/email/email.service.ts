import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Student } from 'src/studentAuth/entities';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { PasswordRecoveryData } from 'src/shared';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  /* 
=======================================
Send Welcome Email
========================================
*/
  async sendUserWelcomeEmail(student: Student, token: string): Promise<void> {
    const confirmationUrl = `exmaple.com/auth/confrim?token=${token}`;

    await this.mailService.sendMail({
      to: student.email,
      from: '"UniIlorin HealthCare" <support@example.com>', // override default from,
      subject: 'Welcome to UniIlorin Health Center ✔ Confirm your Email',
      template: 'welcome', // `.ejs` extension is appended automatically
      context: {
        name: student.firstName,
        confirmationUrl,
      },
    });
  }

  async sendAccountActivationCode(
    doctor: DoctorEntity,
    confirmationCode: string,
  ) {
    const confirmationUrl = `https://foodit-cpig.onrender.com/auth/vendor/account_activation?token=${confirmationCode}`;

    await this.mailService
      .sendMail({
        to: doctor.email,
        from: '"UniIlorin HealthCare" <support@example.com>', // override default from,
        subject: 'ACCOUNT ACTIVATION',
        template: './accountActivation', // `.ejs` extension is appended automatically
        context: {
          name: doctor.firstName,
          confirmationUrl,
        },
      })
      .then(() => {})
      .catch(() => {});
  }

  async sendAccountSuccessEmail(email: string, businessName: string) {
    await this.mailService.sendMail({
      to: email,
      from: '"UniIlorin HealthCare" <support@example.com>', // override default from,
      subject: 'ACCOUNT ACTIVATION SUCCESSFUL',
      template: './accountActivationSuccess', // `.ejs` extension is appended automatically
      context: {
        name: businessName,
      },
    });
  }

  async validationMail(doctor: DoctorEntity, token: string) {
    const confirmationUrl = `exmaple.com/auth/confrim?token=${token}`;

    await this.mailService.sendMail({
      to: doctor.email,
      from: '"UniIlorin HealthCare" <support@example.com>', // override default from,
      subject: 'Welcome to FoodIt! Confirm your Email',
      template: './welcome', // `.ejs` extension is appended automatically
      context: {
        name: doctor.firstName,
        confirmationUrl,
      },
    });
  }

  async sendPasswordRecoveryEmail(data: PasswordRecoveryData) {
    const { email, name, resetToken } = data;
    const resetPasswordUrl = `exmaple.com/auth/confrim?token=${resetToken}`;

    await this.mailService.sendMail({
      to: email,
      from: '"UniIlorin HealthCare" <support@example.com>', // override default from,
      subject: 'Password Recovery Assistance!',
      template: './forgotPassword', // `.ejs` extension is appended automatically
      context: {
        name: name,
        resetPasswordUrl,
      },
    });
  }
}
