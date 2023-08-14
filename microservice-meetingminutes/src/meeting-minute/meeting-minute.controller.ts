import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { MeetingMinuteDTO } from './dto/meeting-minute.dto';
import { MeetingMinuteService } from './meeting-minute.service';
import { Request } from 'express';
import { MeetingMinuteMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class MeetingMinuteController {

    constructor(private readonly meetingMinuteService: MeetingMinuteService){

    }
 
    @MessagePattern(MeetingMinuteMSG.CREATE)
    create(@Payload() payload: any ){
        console.log("SOY CONTROLADOR ACTAS -> REQUEST.user = ", payload.user);
       /*  const newMeetingMinute = this.meetingMinuteService.create(meetingMinuteDTO) */
        return this.meetingMinuteService.create(payload.meetingMinuteDTO, payload.user);
    }

    @MessagePattern(MeetingMinuteMSG.FIND_ALL)
    findAll(){
        return this.meetingMinuteService.findAll();
    }

    @MessagePattern(MeetingMinuteMSG.FIND_ONE)
    findOne(@Payload() id: string){
        return this.meetingMinuteService.findOne(id);
    }

    @MessagePattern(MeetingMinuteMSG.UPDATE)
    update(@Payload() payload: any){
        console.log("HGOLAASADASDASDSA")
        return this.meetingMinuteService.update(payload.id, payload.meetingMinuteDTO);
    }

    @MessagePattern(MeetingMinuteMSG.DELETE)
    delete(@Payload() id : string){
        return this.meetingMinuteService.delete(id);
    }
}
