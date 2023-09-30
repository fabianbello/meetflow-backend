import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        return {
          transport: {
         /*    host: process.env.MAIL_HOST, */
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 8000,
            secure: 'true',
          /*   port: process.env.MAIL_PORT, */
            auth: {
              user: 'meetingflowing@gmail.com',
              pass: 'qccjccmfhonxbgfn',
            },
          },
          defaults: {
            from: '"nest-modules" <${meetingflowing@gmail.com}>',
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
})
export class MailModule {}
