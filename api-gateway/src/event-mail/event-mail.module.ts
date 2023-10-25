import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MeetingMinuteDTO } from 'src/meeting-minute/dto/meeting-minute.dto';
import { UserDTO } from 'src/user/dto/user.dto';

@Module({})
export class EventMailModule {
  constructor(private readonly mailService: MailerService) { }

  // NOTIFICACIONES -> SE TRASLADA LOGICA A MICROSERVICIO DE NOTIFICATIONS

  // IMPORTANTE!!!!!! ESTO NO ES USADO ACTUALMENTE AQUÍ
  // IMPORTANTE!!!!!! ESTO NO ES USADO ACTUALMENTE AQUÍ

  // ES POSIBLE MODIFICARSE PARA USAR AQUÍ PERO NO ES RECOMENDABLE, 
  // PREFIERA USAR MICROSERVICIO DE NOTIFICATIONS

  @OnEvent('user.created')
  handleUserCreatedEvent(user: UserDTO) {
    this.mailService.sendMail({
      to: user.email,
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
    user: UserDTO,
  ) {
    console.log('[EVENTO] EVENTO ACTA!', meetingMinuteDTO, user);

    if (meetingMinuteDTO.fase === 'pre-reunión') {
      let s = 0;
      while (s < meetingMinuteDTO.secretaries.length) {
        this.mailService.sendMail({
          to: meetingMinuteDTO.secretaries[s],
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
          to: meetingMinuteDTO.leaders[l],
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
          to: meetingMinuteDTO.participants[i],
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
          to: meetingMinuteDTO.secretaries[s],
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
          to: meetingMinuteDTO.leaders[l],
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
    user: UserDTO,
  ) {
    console.log('[EVENTO] EVENTO REMEMBER!', remember, user);
    this.mailService.sendMail({
      to: user.email,
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
    user: UserDTO,
  ) {
    console.log('[EVENTO] EVENTO INVITADO EXTERNO!', meetingMinuteDTO, user);
    this.mailService.sendMail({
      to: meetingMinuteDTO.emailExternal,
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
