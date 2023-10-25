import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { MeetingMinuteDTO } from './dto/meeting-minute.dto';
import { MeetingMinuteService } from './meeting-minute.service';
import { Request } from 'express';
import { MeetingMinuteMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class MeetingMinuteController {

    constructor(private readonly meetingMinuteService: MeetingMinuteService) {
    }

    /* 
    Modelo estructural de datos:

      1. IMeetingMinute:    Interface

      2. MeetingMinuteMSG:  Mensajeria por RabbitMQ

      3. meetingMinuteDTO:  MeetingMinuteDTO: Objeto de transferencia de datos 

    */

    // METODOS CRUD para actas dialógicas

    /*  
     Método para crear una nueva acta dialógica.
     entrada: datos del acta dialógica. 
     salida: objeto de nueva acta dialógica.  
    */
    @MessagePattern(MeetingMinuteMSG.CREATE)
    create(@Payload() payload: any) {
        return this.meetingMinuteService.create(payload.meetingMinuteDTO, payload.user);
    }

    /*  
    Método para obtener todas las actas dialógicas.
    salida: objeto de actas dialógicas encontradas. 
    */
    @MessagePattern(MeetingMinuteMSG.FIND_ALL)
    findAll() {
        return this.meetingMinuteService.findAll();
    }

    /*  
     Método para  obtener una acta dialógica a partir del id.
     entrada: id de la acta dialógica. 
     salida: objeto de la acta dialógica encontrada.  
     */
    @MessagePattern(MeetingMinuteMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.meetingMinuteService.findOne(id);
    }

    /*  
    Método para actualizar una acta dialógica a partir del id.
    entrada: id de la acta dialógica y nuevos datos de la acta dialógica. 
    salida: objeto de la acta dialógica actualizada.
    */
    @MessagePattern(MeetingMinuteMSG.UPDATE)
    update(@Payload() payload: any) {
        return this.meetingMinuteService.update(payload.id, payload.meetingMinuteDTO);
    }

    /*  
    Método para borrar permanentemente una acta dialógica a partir del id.
    entrada: id de la acta dialógica.
    salida: valor booleano de confirmación.
    */
    @MessagePattern(MeetingMinuteMSG.DELETE)
    delete(@Payload() id: string) {
        return this.meetingMinuteService.delete(id);
    }

}
