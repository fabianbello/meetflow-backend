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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GuestMSG, ProjectMSG } from 'src/common/constants';
import { IProject } from 'src/common/interfaces/project.interface';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { ProjectDTO } from './dto/project.dto';
import { Request } from 'express';

@ApiTags('projects')
@UseGuards(JwtAuthGuard)
@Controller('api/project')
export class ProjectController {
  constructor(private readonly clientProxy: ClientProxyMeetflow) {}

  // Proyectos
  private _clientProxyProject = this.clientProxy.clientProxyProject();

  // Invitados
  private _clientProxyGuest = this.clientProxy.clientProxyGuest();

/*   @Post()
  create(@Body() projectDTO: ProjectDTO): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.CREATE, projectDTO);
  } */
/* 
  @Get()
  findAll(): Observable<IProject[]> {
    return this._clientProxyProject.send(ProjectMSG.FIND_ALL, '');
  } */


  @Get(':id')
  async findOne(@Param('id') id: string) {

    return await this._clientProxyProject.send(ProjectMSG.FIND_ONE, id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() projectDTO: ProjectDTO,
  ): Promise<Observable<IProject>> {
    return await this._clientProxyProject.send(ProjectMSG.UPDATE, { id, projectDTO });
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

  // Metodo para crear un nmuevo proyecto a partir de un susuario obtenido de 

  @Post('create')
  @ApiOperation({ summary: 'Crear proyecto' })
  async addProject(@Body() projectDTO: ProjectDTO, @Req() req: any) {
    console.log("SOY CONTROLADOR PROJECTS -> REQUEST.user = ", req.user);
    const userEmail = req.user.email;
    projectDTO.userOwner = userEmail;
    projectDTO.userMembers = userEmail;
    return await this._clientProxyProject.send(ProjectMSG.CREATE, projectDTO);
  }
  
  // Metodo que entrega los proyectos para un determinado usuario

  @Get('/get/findByUser')
  @ApiOperation({ summary: 'encuentra proyect' })
  async findAllForUser(@Req() req: any){
/*     console.log("USUARIO FIND BY USER ", req.user); */
    return await this._clientProxyProject.send('LIST_PROJECTS', req.user).toPromise();

  }

  @Post(':projectId/member/:memberEmail')
  async addMember(
    @Param('projectId') projectId: string,
    @Param('memberEmail') memberEmail: string,
  ) {
    const params = {
      projectId: projectId,
      memberEmail: memberEmail
    }
/*     const member = await this.guestService.findOne(memberEmail);
    if (!member) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    } else {
      return this.projectService.addGuest(projectId, memberEmail);
    } */
    return this._clientProxyProject.send(ProjectMSG.ADD_MEMBER, params);
  }

  
}
