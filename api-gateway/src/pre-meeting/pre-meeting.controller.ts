import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { PreMeetingDTO } from './dto/pre-meeting.dto';
import { IPreMeeting } from 'src/common/interfaces/pre-meeting.interface';
import { Observable } from 'rxjs/internal/Observable';
import { PreMeetingMSG } from 'src/common/constants';
import { IMeeting } from 'src/common/interfaces/meeting.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('preMeetings')
@Controller('api/pre-meeting')
export class PreMeetingController {
  constructor(private readonly clientProxy: ClientProxyMeetflow) {}
  private _clientProxyPreMeeting = this.clientProxy.clientProxyPreMeeting();

  @Post('/:meetingId')
  create(@Param('meetingId') meetingId: string): Observable<IPreMeeting> {
    return this._clientProxyPreMeeting.send(PreMeetingMSG.CREATE, meetingId);
  }

  @Get()
  findAll(): Observable<IMeeting[]> {
    return this._clientProxyPreMeeting.send(PreMeetingMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPreMeeting> {
    return this._clientProxyPreMeeting.send(PreMeetingMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() preMeetingDTO: PreMeetingDTO,
  ): Observable<IPreMeeting> {
    return this._clientProxyPreMeeting.send(PreMeetingMSG.UPDATE, { id, preMeetingDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyPreMeeting.send(PreMeetingMSG.DELETE, id);
  }


}
