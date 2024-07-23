import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          // port: 465,
          // ignoreTLS: true,
          secure: false,
          auth: {
            user: config.get('USER_GMAIL'),
            pass: config.get('USER_PASSWORD'),
          },
        },
        defaults: {
          from: `"UniIlorin HealthCare" <${config.get('USER_GMAIL')}>`,
        },
        template: {
          dir: join(__dirname + '/templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
