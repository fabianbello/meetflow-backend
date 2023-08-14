import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { MeetingMinuteDTO } from './dto/meeting-minute.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MeetingMinuteMSG } from 'src/common/constants';
import { IMeetingMinute } from 'src/common/interfaces/meeting-minute.interface';
import { Observable } from 'rxjs';
import { MeetingMinuteService } from './meeting-minute.service';

@UseGuards(JwtAuthGuard)
@Controller('api/meeting-minute')
export class MeetingMinuteController {
  constructor(private readonly clientProxy: ClientProxyMeetflow, private readonly meetingMinuteService: MeetingMinuteService) {}

  private _clientProxyMeetingMinute =
    this.clientProxy.clientProxyMeetingMinute();

  @Post()
  @ApiOperation({ summary: 'create project2' })
  create(@Body() meetingMinuteDTO: MeetingMinuteDTO, @Req() req: any) : Observable<IMeetingMinute> {
    console.log('SOY CONTROLADOR ACTAS -> REQUEST.user = ', req.user);
    const params = {
        meetingMinuteDTO: meetingMinuteDTO,
        user: req.user
    }
    /*  const newMeetingMinute = this.meetingMinuteService.create(meetingMinuteDTO) */
    return this._clientProxyMeetingMinute.send(MeetingMinuteMSG.CREATE, params);
  }

  @Get()
  findAll(): Observable<IMeetingMinute>{
      return this._clientProxyMeetingMinute.send(MeetingMinuteMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IMeetingMinute>{
      return this._clientProxyMeetingMinute.send(MeetingMinuteMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() meetingMinuteDTO: MeetingMinuteDTO): Observable<IMeetingMinute>{
      console.log("HGOLAASADASDASDSA")
      const params = {
        id: id,
        meetingMinuteDTO: meetingMinuteDTO
      }
      console.log("[MEETING CONTROLLER] ME LLEGO ESTO PARA ACTUALIZAR: ", meetingMinuteDTO);
      return this._clientProxyMeetingMinute.send(MeetingMinuteMSG.UPDATE, params);
  }

  @Delete(':id')
  delete(@Param('id') id : string): Observable<any> {
      return this._clientProxyMeetingMinute.send(MeetingMinuteMSG.DELETE, id);
  }

/*   @Post('notificar')
  sendNotification(@Body() meetingMinuteDTO: MeetingMinuteDTO, @Req() req: Request ){
      console.log("SOY CONTROLADOR ACTA NOTIFICAR -> REQUEST.user = ", req.user);
      //const newMeetingMinute = this.meetingMinuteService.create(meetingMinuteDTO)
      return this._clientProxyMeetingMinute.sendNotification(meetingMinuteDTO, req.user);
  } */

  @Post('/notificar')
  sendNotification(@Body() meetingMinuteDTO: any, @Req() req: any ){
      console.log("SOY CONTROLADOR ACTA NOTIFICAR -> REQUEST.user = ", req.user);
/*       const newMeetingMinute = this.meetingMinuteService.create(meetingMinuteDTO) */
      return this.meetingMinuteService.sendNotification(meetingMinuteDTO, req.user);
  }

  @Post('/notificar/remember')
  sendNotificationRemember(@Body() remember: any, @Req() req: any ){
      console.log("SOY CONTROLADOR ACTA NOTIFICAR -> REQUEST.user = ", req.user);
/*       const newMeetingMinute = this.meetingMinuteService.create(meetingMinuteDTO) */
      return this.meetingMinuteService.sendNotificationRemember(remember, req.user);
  }

  @Post('/notificary/remember/task')
  sendNotificationRememberTask(@Body() remember: any, @Req() req: any ){
      console.log("SOY CONTROLADOR ACTA NOTIFICAR TAREA -> REQUEST.user = ", req.user);
      console.log("SOY CONTROLADOR ACTA NOTIFICAR TAREA -> REMEMBER  = ", remember.milisec);
/*       const newMeetingMinute = this.meetingMinuteService.create(meetingMinuteDTO) */
      return this.meetingMinuteService.eventActivationTime(remember, remember.milisec, req.user);
  }


/*   @Post('notificar')
  sendNotification2(@Body() meetingMinuteDTO: MeetingMinuteDTO, @Req() req: any ){
      console.log("SOY CONTROLADOR ACTA NOTIFICAR -> REQUEST.user = ", req.user);
      const newMeetingMinute = this.meetingMinuteService.create(meetingMinuteDTO)
      return this.meetingMinuteService.sendNotification(meetingMinuteDTO, req.user);
  } */




}
