import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MeetingMSG, ProjectMSG } from 'src/common/constants';
import { IMeeting } from 'src/common/interfaces/meeting.interface';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { MeetingDTO } from './dto/meeting.dto';

@Controller('api/meeting')
export class MeetingController {
  constructor(private readonly clientProxy: ClientProxyMeetflow) {}

  // Reuniones
  private _clientProxyMeeting = this.clientProxy.clientProxyMeeting();

  // Proyectos
  private _ClientProxyProject = this.clientProxy.clientProxyProject();

  @Post()
  create(@Body() meetingDTO: MeetingDTO): Observable<IMeeting> {
    return this._clientProxyMeeting.send(MeetingMSG.CREATE, meetingDTO);
  }

  @Get()
  findAll(): Observable<IMeeting[]> {
    return this._clientProxyMeeting.send(MeetingMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IMeeting> {
    return this._clientProxyMeeting.send(MeetingMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() meetingDTO: MeetingDTO,
  ): Observable<IMeeting> {
    return this._clientProxyMeeting.send(MeetingMSG.UPDATE, { id, meetingDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyMeeting.send(MeetingMSG.DELETE, id);
  }

  @Post(':meetingId/project/:projectId')
  async addProject(
    @Param('meetingId') meetingId: string,
    @Param('projectId') projectId: string,
  ) {
    const project = await this._ClientProxyProject
      .send(ProjectMSG.FIND_ONE, projectId)
      .toPromise();
    if (!project)
      throw new HttpException('Projecto no encontrado', HttpStatus.NOT_FOUND);

    return this._clientProxyMeeting.send(MeetingMSG.ADD_PROJECT, {
      meetingId,
      projectId,
    });
  }
}
