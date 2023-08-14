
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { IPostMeeting } from 'src/common/interfaces/post-meeting.interface';
import { Observable } from 'rxjs';
import { PostMeetingMSG } from 'src/common/constants';
import { PostMeetingDTO } from './dto/post-meeting.dto';

@Controller('api/post-meeting')
export class PostMeetingController {

    constructor(private readonly clientProxy: ClientProxyMeetflow) {}
    private _clientProxyPostMeeting = this.clientProxy.clientProxyPostMeeting();

    @Post('/:meetingId')
    create(@Param('meetingId') meetingId: string): Observable<IPostMeeting> {
      return this._clientProxyPostMeeting.send(PostMeetingMSG.CREATE, meetingId);
    }
  
    @Get()
    findAll(): Observable<IPostMeeting[]> {
      return this._clientProxyPostMeeting.send(PostMeetingMSG.FIND_ALL, '');
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Observable<IPostMeeting> {
      return this._clientProxyPostMeeting.send(PostMeetingMSG.FIND_ONE, id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() inMeetingDTO: PostMeetingDTO,
    ): Observable<IPostMeeting> {
      return this._clientProxyPostMeeting.send(PostMeetingMSG.UPDATE, {
        id,
        inMeetingDTO,
      });
    }
  
    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
      return this._clientProxyPostMeeting.send(PostMeetingMSG.DELETE, id);
    }
}
