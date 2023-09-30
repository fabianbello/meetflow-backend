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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GuestMSG, ProjectMSG } from 'src/common/constants';
import { IProject } from 'src/common/interfaces/project.interface';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { ProjectDTO } from './dto/project.dto';
import { Observable } from 'rxjs';

@ApiTags('Microservicio de proyectos (microservice-projects)')
@UseGuards(JwtAuthGuard)
@Controller('api/project')
export class ProjectController {

  // Entrada: cliente proxy global
  constructor(private readonly clientProxy: ClientProxyMeetflow) { }

  // Proyectos
  private _clientProxyProject = this.clientProxy.clientProxyProject();

  // Invitados
  private _clientProxyGuest = this.clientProxy.clientProxyGuest();

  /* 
  Modelo estructural de datos:

    1. IProject:    Interface

    2. ProjectMSG:  Mensajeria por RabbitMQ

    3. projectDTO:  ProjectDTO: Objeto de transferencia de datos 

  */

  // METODOS CRUD para proyectos

  /*  
    Metodo para crear un nueva proyecto a partir de un usuario. 
    (se autoasigna como jefe de proyecto al usuario que crea el proyecto)
    entrada: datos del proyecto (nombre corto). 
    salida: objeto de nueva proyecto.  
  */
  @Post('create')
  @ApiOperation({ summary: 'Crear un proyecto' })
  async addProject(@Body() projectDTO: ProjectDTO, @Req() req: any) {
    console.log("SOY CONTROLADOR PROJECTS -> REQUEST.user = ", req.user);
    const userEmail = req.user.email;
    projectDTO.userOwner = userEmail;
    projectDTO.userMembers = userEmail;
    return await this._clientProxyProject.send(ProjectMSG.CREATE, projectDTO);
  }

  /*  
   Metodo para  obtener un proyecto a partir del id.
   entrada: id del proyecto. 
   salida: objeto del proyecto encontrada.  
   */
  @Get('/getProjectbyID/:id')
  @ApiOperation({ summary: 'Obtener proyecto por id' })
  async findOne(@Param('id') id: string) {
    return await this._clientProxyProject.send(ProjectMSG.FIND_ONE, id);
  }

  /*  
  Metodo para actualizar un proyecto a partir del id.
  entrada: id del proyecto y nuevos datos del proyecto. 
  salida: objeto del proyecto actualizada.
  */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar proyecto por id' })
  async update(
    @Param('id') id: string,
    @Body() projectDTO: ProjectDTO,
  ): Promise<Observable<IProject>> {
    return await this._clientProxyProject.send(ProjectMSG.UPDATE, { id, projectDTO });
  }

  /*  
  Metodo para borrar permanentemente un proyecto a partir del id.
  entrada: id del proyecto.
  salida: valor booleano de confirmación.
  */
  @Delete(':id')
  @ApiOperation({ summary: 'Borrar permanentemente un proyecto por id' })
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


  // Metodo que entrega los proyectos para un determinado usuario
  @Get('/get/findByUser')
  @ApiOperation({ summary: 'encuentra proyect' })
  async findAllForUser(@Req() req: any) {
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
    return this._clientProxyProject.send(ProjectMSG.ADD_MEMBER, params);
  }


}
