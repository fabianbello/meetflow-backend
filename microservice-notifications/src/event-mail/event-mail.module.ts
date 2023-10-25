import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Module({})
export class EventMailModule {
  constructor(private readonly mailService: MailerService) { }

  @OnEvent('user.created')
  handleUserCreatedEvent(user: any) {
    this.mailService.sendMail({
      to: user.email, 
      from: process.env.EMAIL_USER,
      template: 'welcome',
      subject: 'Bienvenido a la app',
      context: {
        name: user.name,
      },
      attachments: [],
    });
  }

  @OnEvent('meetingMinute.created')
  handlemeetingMinuteCreatedEvent(
    meetingMinuteDTO: any,
    user: any,
  ) {
    if (meetingMinuteDTO.fase === 'pre-reunión') {
      let s = 0;
      while (s < meetingMinuteDTO.secretaries.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.secretaries[s],
          from: process.env.EMAIL_USER,
          template: 'actacreada',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        s++;
      }

      let l = 0;
      while (l < meetingMinuteDTO.leaders.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.leaders[l], 
         
          from: process.env.EMAIL_USER,
          template: 'actacreada',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        l++;
      }


    } else if (meetingMinuteDTO.fase === 'en-reunión') {

      let i = 0;

      while (i < meetingMinuteDTO.participants.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.participants[i], 
          from: process.env.EMAIL_USER,
          template: 'inmeeting',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        i++;

      }

      let s = 0;
      while (s < meetingMinuteDTO.secretaries.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.secretaries[s], 

          from: process.env.EMAIL_USER,
          template: 'inmeeting',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        s++;
      }

      let l = 0;
      while (l < meetingMinuteDTO.leaders.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.leaders[l], 
          from: process.env.EMAIL_USER,
          template: 'inmeeting',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        l++;
      }
    }else if (meetingMinuteDTO.fase === 'post-reunión') {

      let i = 0;

      while (i < meetingMinuteDTO.participants.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.participants[i], 
          from: process.env.EMAIL_USER,
          template: 'postmeeting',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        i++;

      }

      let s = 0;
      while (s < meetingMinuteDTO.secretaries.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.secretaries[s], 
   
          from: process.env.EMAIL_USER,
          template: 'postmeeting',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        s++;
      }

      let l = 0;
      while (l < meetingMinuteDTO.leaders.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.leaders[l], 

          from: process.env.EMAIL_USER,
          template: 'postmeeting',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        l++;
      }
    }else if (meetingMinuteDTO.fase === 'finish-reunión') {

      let i = 0;

      while (i < meetingMinuteDTO.participants.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.participants[i], 
          from: process.env.EMAIL_USER,
          template: 'finishmeeting',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        i++;

      }

      let s = 0;
      while (s < meetingMinuteDTO.secretaries.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.secretaries[s], 
          from: process.env.EMAIL_USER,
          template: 'finishmeeting',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        s++;
      }

      let l = 0;
      while (l < meetingMinuteDTO.leaders.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.leaders[l], 
          from: process.env.EMAIL_USER,
          template: 'finishmeeting',
          subject: 'Soporte Meetflow',
          context: {
            name: user.email,
            acta: meetingMinuteDTO.title,
            meet: meetingMinuteDTO.number,
            lugar: meetingMinuteDTO.place,
            fase: meetingMinuteDTO.fase,
            linky: meetingMinuteDTO.linky
          },
          attachments: [],
        });
        l++;
      }
    }
  }


  @OnEvent('meetingMinute.rembemberTask')
  handleRememberTaskEvent(
    remember: any,
    user: any,
  ) {
    this.mailService.sendMail({
      to: user.email, 
      cc: remember.oncharge,
      from: process.env.EMAIL_USER,
      template: 'welcome',
      subject: 'Recordatorio de tarea en Meetflow',
      context: {
        name: user.email,
        type: remember.type,
      },
      attachments: [],
    });

  }

  @OnEvent('meetingMinute.inviteExternal')
  handleInviteExternalEvent(
    meetingMinuteDTO: any,
    user: any,
  ) {
    this.mailService.sendMail({
      to: meetingMinuteDTO.emailExternal, 
      from: process.env.EMAIL_USER,
      template: 'inviteExternal',
      subject: 'Invitación a reunión en plataforma Meetflow',
      context: {
        name: user.email,
        emailExternal: meetingMinuteDTO.emailExternal,
        acta: meetingMinuteDTO.title,
        meet: meetingMinuteDTO.number,
        lugar: meetingMinuteDTO.place,
        fase: meetingMinuteDTO.fase,
        linky: meetingMinuteDTO.linky
      },
      attachments: [],
    });

  }

  @OnEvent('auth.resetpass')
  handleResetPassEvent(
    user: any,
  ) {
    this.mailService.sendMail({
      to: user.email, 
      from: process.env.EMAIL_USER,
      template: 'resetpass',
      subject: 'Soporte Meetflow: Recuperación de cuenta',
      context: {
        name: user.email,
        password: user.password
      },
      attachments: [],
    });

  }
}
