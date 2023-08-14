
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { IInMeeting } from 'src/common/interfaces/in-meeting.interface';
import { Observable } from 'rxjs';
import { InMeetingMSG } from 'src/common/constants';
import { InMeetingDTO } from './dto/in-meeting.dto';

@Controller('api/in-meeting')
export class InMeetingController {
  constructor(private readonly clientProxy: ClientProxyMeetflow) {}
  private _clientProxyInMeeting = this.clientProxy.clientProxyInMeeting();

  @Post('/:meetingId')
  create(@Param('meetingId') meetingId: string): Observable<IInMeeting> {
    return this._clientProxyInMeeting.send(InMeetingMSG.CREATE, meetingId);
  }

  @Get()
  findAll(): Observable<IInMeeting[]> {
    return this._clientProxyInMeeting.send(InMeetingMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IInMeeting> {
    return this._clientProxyInMeeting.send(InMeetingMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() inMeetingDTO: InMeetingDTO,
  ): Observable<IInMeeting> {
    return this._clientProxyInMeeting.send(InMeetingMSG.UPDATE, {
      id,
      inMeetingDTO,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyInMeeting.send(InMeetingMSG.DELETE, id);
  }
}
