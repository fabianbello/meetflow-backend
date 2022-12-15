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
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GuestMSG, ProjectMSG } from 'src/common/constants';
import { IProject } from 'src/common/interfaces/project.interface';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { ProjectDTO } from './dto/project.dto';

@ApiTags('projects')
/* @UseGuards(JwtAuthGuard) */
@Controller('api/project')
export class ProjectController {
  constructor(private readonly clientProxy: ClientProxyMeetflow) {}

  // Proyectos
  private _clientProxyProject = this.clientProxy.clientProxyProject();

  // Invitados
  private _clientProxyGuest = this.clientProxy.clientProxyGuest();

  @Post()
  create(@Body() projectDTO: ProjectDTO): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.CREATE, projectDTO);
  }

  @Get()
  findAll(): Observable<IProject[]> {
    return this._clientProxyProject.send(ProjectMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() projectDTO: ProjectDTO,
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.UPDATE, { id, projectDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyProject.send(ProjectMSG.DELETE, id);
  }

  @Post(':projectId/guest/:guestId')
  async addGuest(
    @Param('projectId') projectId: string,
    @Param('guestId') guestId: string,
  ) {
    const guest = await this._clientProxyGuest.send(GuestMSG.FIND_ONE, guestId);
    if (!guest) {
      throw new HttpException('Invitado no encontrado', HttpStatus.NOT_FOUND);
    } else {
      return this._clientProxyProject.send(ProjectMSG.ADD_GUEST, {
        projectId,
        guestId,
      });
    }
  }
}
