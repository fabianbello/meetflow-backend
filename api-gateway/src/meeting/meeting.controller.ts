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

import { MeetingMSG, ProjectMSG } from 'src/common/constants';
import { IMeeting } from 'src/common/interfaces/meeting.interface';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { MeetingDTO } from './dto/meeting.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@ApiTags('Microservicio de reuniones (microservice-meetings)')
@ApiBearerAuth()
@Controller('api/meeting')
export class MeetingController {
  // Entrada: cliente proxy global
  constructor(private readonly clientProxy: ClientProxyMeetflow) { }

  // cliente proxy de reuniones
  private _clientProxyMeeting = this.clientProxy.clientProxyMeeting();

  // cliente proxy de proyectos
  private _ClientProxyProject = this.clientProxy.clientProxyProject();

  /* 
    Modelo estructural de datos:

        1. IMeeting:    Interface

        2. MeetingMSG:  Mensajeria por RabbitMQ

        3. meetingDTO:  MeetingDTO: Objeto de transferencia de datos 

  */

  // METODOS CRUD para reuniones

  /*  
  Método para crear una nueva reunión.
  entrada: datos de la reunión. 
  salida: objeto de nueva reunión.  
  */
  @Post()
  @ApiOperation({ summary: 'Crear una reunión' })
  async create(@Body() meetingDTO: MeetingDTO): Promise<Observable<IMeeting>> {
    return await this._clientProxyMeeting.send(MeetingMSG.CREATE, meetingDTO);
  }

  /*  
  Método para asignar estado a la reunión
  entrada: datos del nuevo estado de la reunion y la id de la reunion a actualizar
  salida: objeto de reuniones actualizadas. 
  */
  @Post('/edit/:id/state')
  @ApiOperation({ summary: 'Asignar estado a la reunión' })
  updateState(@Param('id') id: string, @Body() state: any) {
    const params = {
      id: id,
      state: state
    }
    return this._clientProxyMeeting.send(MeetingMSG.SET_STATE, params);
  }

  /*  
  Método para obtener todas las reuniones.
  salida: objeto de reuniones encontradas. 
  */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las reuniones' })
  async findAll(): Promise<Observable<IMeeting[]>> {
    return await this._clientProxyMeeting.send(MeetingMSG.FIND_ALL, '');
  }

  /*  
  Método para  obtener una reunión a partir del id.
  entrada: id de la reunión. 
  salida: objeto de la reunión encontrada.  
  */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener reunión por id' })
  async findOne(@Param('id') id: string): Promise<Observable<IMeeting>> {
    return await this._clientProxyMeeting.send(MeetingMSG.FIND_ONE, id);
  }

  /*  
  Método para  obtener runiones a partir del id de un proyecto.
  entrada: el id del proyecto. 
  salida: objeto de las reuniones encontrada para el proyecto.  
  */
  @Get('/project/:id')
  @ApiOperation({ summary: 'Obtener reuniones por id de proyecto' })
  async findByProject(@Param('id') id: string): Promise<Observable<IMeeting[]>> {
    return await this._clientProxyMeeting.send(MeetingMSG.FIND_BY_PROJECT, id);
  }

  /*  
  Método para actualizar una reunión a partir del id.
  entrada: id de la reunión y nuevos datos de la reunión. 
  salida: objeto de la reunión actualizada.
  */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar reunión por id' })
  async update(
    @Param('id') id: string,
    @Body() meetingDTO: MeetingDTO,
  ): Promise<Observable<IMeeting>> {
    return await this._clientProxyMeeting.send(MeetingMSG.UPDATE, { id, meetingDTO });
  }

  /*  
  Método para borrar permanentemente una reunión a partir del id.
  entrada: id de la reunión.
  salida: valor booleano de confirmación.
  */
  @Delete(':id')
  @ApiOperation({ summary: 'Borrar permanentemente una reunión por id' })
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyMeeting.send(MeetingMSG.DELETE, id);
  }

  /*  
  Método para vincular una reunión a un proyecto
  entrada: id del proyecto, id de la reunión
  salida: objeto de la reunión con el proyecto vinculado.
  */
  @Post(':meetingId/project/:projectId')
  @ApiOperation({ summary: 'Vincular reunión por id a un proyecto por id de proyecto' })
  async addProject(
    @Param('meetingId') meetingId: string,
    @Param('projectId') projectId: string,
  ) {
    const project = await this._ClientProxyProject
      .send(ProjectMSG.FIND_ONE, projectId)
      .toPromise();
    if (!project)
      throw new HttpException('Proyecto no encontrado', HttpStatus.NOT_FOUND);
    return await this._clientProxyMeeting.send(MeetingMSG.ADD_PROJECT, {
      meetingId,
      projectId,
    });
  }

  /*  
  Método para  obtener runiones a partir del id de un proyecto.
  entrada: el id del proyecto. 
  salida: objeto de las reuniones encontrada para el proyecto.  
  */
  @Get('/project/:idProject/number/:numberMeet')
  @ApiOperation({ summary: 'Obtener reunion por id de proyecto y numero de la reunion' })
  async findByProjectNumber(
    @Param('idProject') idProject: string, 
    @Param('numberMeet') numberMeet: string): Promise<Observable<IMeeting[]>> {
    return await this._clientProxyMeeting.send("FIND_BY_PROJECT_NUMBER", {idProject, numberMeet});
  }

  /*  
  Metodo para calcular la cantidad de reuniones totales en la plataforma.
  salida: cantidad de reuniones totales
  */
  @Get('/counts')
  @ApiOperation({ summary: 'obtener la cantidad total de usuarios' })
  countUsers(@Req() req: any) {
    console.log("CANTIDAD DE reuniones");
    return this._clientProxyMeeting.send('countmeetings', '');
  }
}
