import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Module({})
export class EventMailModule {
  constructor(private readonly mailService: MailerService) { }

  @OnEvent('user.created')
  handleUserCreatedEvent(user: any) {
    console.log('EVENTO USER!', user);

    this.mailService.sendMail({
      to: user.email, //
      /* to: 'wwwualala@gmail.com', */
      /*  bcc: '' // replica oculta  */
      from: 'meetingflowing@gmail.com',
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
    console.log('[EVENTO] ENVIANDO CORREO a todos...!', meetingMinuteDTO, user);

    if (meetingMinuteDTO.fase === 'pre-reunión') {
      let s = 0;
      while (s < meetingMinuteDTO.secretaries.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.secretaries[s], //
          /* to: 'wwwualala@gmail.com', */
          /*  bcc: '' // replica oculta  */

          from: 'meetingflowing@gmail.com',
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
          to: meetingMinuteDTO.leaders[l], //
          /* to: 'wwwualala@gmail.com', */
          /*  bcc: '' // replica oculta  */

          from: 'meetingflowing@gmail.com',
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
          to: meetingMinuteDTO.participants[i], //
        /*   to: 'wwwualala@gmail.com',
          bcc: '' // replica oculta  */
          from: 'meetingflowing@gmail.com',
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
          to: meetingMinuteDTO.secretaries[s], //
          /* to: 'wwwualala@gmail.com', */
          /*  bcc: '' // replica oculta  */

          from: 'meetingflowing@gmail.com',
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
          to: meetingMinuteDTO.leaders[l], //
          /* to: 'wwwualala@gmail.com', */
          /*  bcc: '' // replica oculta  */

          from: 'meetingflowing@gmail.com',
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
    }
  }


  @OnEvent('meetingMinute.rembemberTask')
  handleRememberTaskEvent(
    remember: any,
    user: any,
  ) {
    console.log('[EVENTO] EVENTO REMEMBER!', remember, user);
    this.mailService.sendMail({
      to: user.email, //
      /* to: 'wwwualala@gmail.com', */
      /*  bcc: '' // replica oculta  */

      from: 'meetingflowing@gmail.com',
      template: 'welcome',
      subject: 'Notificaciones desde Meetflow http://70.35.204.110:4200/',
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
    console.log('[Event] ENVIANDO CORREO', meetingMinuteDTO, user);
    this.mailService.sendMail({
      to: meetingMinuteDTO.emailExternal, //
      /* to: 'wwwualala@gmail.com', */
      /*  bcc: '' // replica oculta  */

      from: 'meetingflowing@gmail.com',
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
}
