import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { PasswordRecoveryData } from 'src/shared';

@Injectable()
export class EmailService {
  private logger: Logger;
  constructor(private readonly mailService: MailerService) {
    this.logger = new Logger(EmailService.name);
  }

  /* 
=======================================
Send Welcome Email
========================================
*/
  async sendUserWelcomeEmail(user: {
    email: string;
    firstName: string;
  }): Promise<void> {
    this.logger.log(`Sending welcome email to: ${user.email}`);
    try {
      await this.mailService.sendMail({
        to: user.email,
        from: '"UniIlorin HealthCare" <support@example.com>', // override default from,
        subject: 'Welcome to UniIlorin Health Center ✔',
        template: './welcome', // `.ejs` extension is appended automatically
        context: {
          userName: user.firstName,
          loginUrl: 'example@url',
        },
      });
      this.logger.log(`Email sent successfully: ${user.email}`);
    } catch (error) {
      this.logger.error(`Error sending email: ${error}`);
    }
  }

  async sendAccountActivationCode(
    doctor: DoctorEntity,
    confirmationCode: number,
  ) {
    const activationUrl = `https://foodit-cpig.onrender.com/doctor/account_activation?confirmationCode=${confirmationCode}`;

    await this.mailService
      .sendMail({
        to: doctor.email,
        from: '"UniIlorin HealthCare" <support@example.com>', // override default from,
        subject: 'ACCOUNT ACTIVATION',
        template: './accountActivation', // `.hbs` extension is appended automatically
        context: {
          userName: doctor.firstName,
          activationUrl,
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
      template: './accountActivationSuccess', // `.hbss` extension is appended automatically
      context: {
        userName: businessName,
      },
    });
  }

  async sendPasswordRecoveryEmail(data: PasswordRecoveryData) {
    const { email, name, resetToken } = data;
    const resetPasswordUrl = `https://foodit-cpig.onrender.com/doctor/account_activation?confirmationCode=${resetToken}`;

    this.logger.log(`Sending Password Recovery email to: ${email}`);
    try {
      await this.mailService.sendMail({
        to: email,
        from: '"UniIlorin HealthCare" <support@example.com>', // override default from,
        subject: 'Reset Password Request',
        template: './forgotPassword', // `.hbs` extension is appended automatically
        context: {
          userName: name,
          resetPasswordUrl,
        },
      });
      this.logger.log(`Password Recovery email sent successfully: ${email}`);
    } catch (error) {
      this.logger.error(`Error sending Password Recovery email: ${error}`);
    }
  }
}
