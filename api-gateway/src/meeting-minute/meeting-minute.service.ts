import { HttpStatus, Injectable } from '@nestjs/common';

import { IMeetingMinute } from 'src/common/interfaces/meeting-minute.interface';
import { MeetingMinuteDTO } from './dto/meeting-minute.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';



@Injectable()
export class MeetingMinuteService {


  constructor(
    private readonly eventEmitter2: EventEmitter2
  ) { }


  async sendNotificationExternal(meetingMinuteDTO: any, user: any): Promise<any> {

    let params = {
      meetingminute: meetingMinuteDTO,
      users: user
    }

    console.log("[MEETING MINUTE SERVICE DESDE API] ESTOY ENVIANDO LO SIGUIENTE COMO EVENTO AL INVITADO EXTERNO: ", meetingMinuteDTO, user);

    return await this.eventEmitter2.emit('meetingMinute.inviteExternal', meetingMinuteDTO, user);

  }


  async sendNotification(meetingMinuteDTO: any, user: any): Promise<any> {

    let params = {
      meetingminute: meetingMinuteDTO,
      user: user
    }

    console.log("[MEETING MINUTE SERVICE DESDE API] ESTOY ENVIANDO LO SIGUIENTE COMO EVENTO: ", meetingMinuteDTO, user);

    return await this.eventEmitter2.emit('meetingMinute.created', meetingMinuteDTO, user);

  }

  async sendNotificationRemember(remember: any, user: any): Promise<any> {

    let params = {
      remember: remember,
      users: user
    }

    console.log("[MEETING MINUTE SERVICE DESDE API] ESTOY ENVIANDO LO SIGUIENTE COMO EVENTO: ", remember, user);

    return await this.eventEmitter2.emit('meetingMinute.rembember', remember, user);

  }


  async sendNotificationRememberTask(remember: any, user: any): Promise<any> {

    let params = {
      remember: remember,
      users: user
    }

    console.log("[MEETING MINUTE SERVICE DESDE API] ESTOY ENVIANDO LO SIGUIENTE COMO EVENTO: ", remember, user);

    return await this.eventEmitter2.emit('meetingMinute.rembember', remember, user);

  }

  // EVENTO DE TAREA

  tarea() {
    console.log('acá va la tarea', new Date());
  }

  lanzarSiempreALaHora(hora, minutos, tarea) {
    var ahora = new Date();
    console.log('lanzado', ahora);
    var momento = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hora, minutos);
    if (momento <= ahora) { // la hora era anterior a la hora actual, debo sumar un día
      momento = new Date(momento.getTime() + 1000 * 60 * 60 * 24);
    }
    console.log('para ser ejecutado en', momento, momento.getTime() - ahora.getTime());
    setTimeout(function () {
      tarea();
      this.lanzarSiempreALaHora(hora, minutos, tarea);
    }, momento.getTime() - ahora.getTime());

  }

  eventActivationTime(remember: any, miliseg: number, user: any) {
    console.log("CUENTA REGRESIVA PARA ENVIAR EMAIL: ", remember);
    console.log("CUENTA REGRESIVA PARA ENVIAR EMAIL: ", miliseg /1000 / 60 );
    setTimeout(async () => {

      await this.eventEmitter2.emit('meetingMinute.rembemberTask', remember, user);

    }, miliseg);
    return true;

  }





}
