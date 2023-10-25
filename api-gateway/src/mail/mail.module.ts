import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        // NOTIFICACIONES -> SE TRASLADA LOGICA A MICROSERVICIO DE NOTIFICATIONS

        // IMPORTANTE!!!!!! ESTO NO ES USADO ACTUALMENTE AQUÍ
        // IMPORTANTE!!!!!! ESTO NO ES USADO ACTUALMENTE AQUÍ

        // ES POSIBLE MODIFICARSE PARA USAR AQUÍ PERO NO ES RECOMENDABLE, 
        // PREFIERA USAR MICROSERVICIO DE NOTIFICATIONS
        
        return {
          transport: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 8000,
            secure: 'true',
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
export class MailModule { }
