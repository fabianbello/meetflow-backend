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
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MeetingMSG, ProjectMSG } from 'src/common/constants';
import { IMeeting } from 'src/common/interfaces/meeting.interface';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { MeetingDTO } from './dto/meeting.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('meetings')
@Controller('api/meeting')
export class MeetingController {
  constructor(private readonly clientProxy: ClientProxyMeetflow) {}

  // Reuniones
  private _clientProxyMeeting = this.clientProxy.clientProxyMeeting();

  // Proyectos
  private _ClientProxyProject = this.clientProxy.clientProxyProject();

  @Post()
  async create(@Body() meetingDTO: MeetingDTO): Promise<Observable<IMeeting>> {
    return await this._clientProxyMeeting.send(MeetingMSG.CREATE, meetingDTO);
  }

  @Post('/edit/:id/state')
  updateState(@Param('id') id: string, @Body() state: any) {
    console.log("ESTADO 2",state);
    const params = {
      id: id,
      state: state
    }
    return this._clientProxyMeeting.send(MeetingMSG.SET_STATE, params);
  }

  @Get()
  async findAll(): Promise<Observable<IMeeting[]>> {
    return await this._clientProxyMeeting.send(MeetingMSG.FIND_ALL, '');
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Observable<IMeeting>> {
    return await this._clientProxyMeeting.send(MeetingMSG.FIND_ONE, id);
  }

  @Get('/project/:id')
  async findByProject(@Param('id') id: string): Promise<Observable<IMeeting[]>> {
    return await this._clientProxyMeeting.send(MeetingMSG.FIND_BY_PROJECT, id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() meetingDTO: MeetingDTO,
  ): Promise<Observable<IMeeting>> {
    return await this._clientProxyMeeting.send(MeetingMSG.UPDATE, { id, meetingDTO });
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

    return await this._clientProxyMeeting.send(MeetingMSG.ADD_PROJECT, {
      meetingId,
      projectId,
    });
  }

  
}
