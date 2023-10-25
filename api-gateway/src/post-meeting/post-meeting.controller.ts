
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { IPostMeeting } from 'src/common/interfaces/post-meeting.interface';
import { Observable } from 'rxjs';
import { PostMeetingMSG } from 'src/common/constants';
import { PostMeetingDTO } from './dto/post-meeting.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Microservicio de post-reuniones (microservice-postmeetings)')
@Controller('api/post-meeting')
export class PostMeetingController {

  // Entrada: cliente proxy global
  constructor(private readonly clientProxy: ClientProxyMeetflow) { }

  // cliente proxy de post reuniones
  private _clientProxyPostMeeting = this.clientProxy.clientProxyPostMeeting();

  /* 
 Modelo estructural de datos:

     1. IPostMeeting:    Interface

     2. PostMeetingMSG:  Mensajeria por RabbitMQ

     3. postMeetingDTO:  PostMeetingDTO: Objeto de transferencia de datos 

 */

  // METODOS CRUD para notificaciones

  /*  
  Método para crear una nueva post reunión.
  entrada: datos de la post reunión. 
  salida: objeto de nueva post reunión.  
  */

  @Post('/:meetingId')
  @ApiOperation({ summary: 'Crear una post reunión' })
  create(@Param('meetingId') meetingId: string): Observable<IPostMeeting> {
    return this._clientProxyPostMeeting.send(PostMeetingMSG.CREATE, meetingId);
  }

  /*  
  Método para obtener todas las post reuniones.
  salida: objeto de post reuniones encontradas. 
  */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las post reuniones' })
  findAll(): Observable<IPostMeeting[]> {
    return this._clientProxyPostMeeting.send(PostMeetingMSG.FIND_ALL, '');
  }

  /*  
  Método para  obtener una post reunión a partir del id.
  entrada: id de la post reunión. 
  salida: objeto de la post reunión encontrada.  
    */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener post reunión por id' })
  findOne(@Param('id') id: string): Observable<IPostMeeting> {
    return this._clientProxyPostMeeting.send(PostMeetingMSG.FIND_ONE, id);
  }

  /*  
  Método para actualizar una post reunión a partir del id.
  entrada: id de la post reunión y nuevos datos de la post reunión. 
  salida: objeto de la post reunión actualizada.
  */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar post reunión por id' })
  update(
    @Param('id') id: string,
    @Body() inMeetingDTO: PostMeetingDTO,
  ): Observable<IPostMeeting> {
    return this._clientProxyPostMeeting.send(PostMeetingMSG.UPDATE, {
      id,
      inMeetingDTO,
    });
  }

  /*  
  Método para borrar permanentemente una post reunión a partir del id.
  entrada: id de la post reunión.
  salida: valor booleano de confirmación.
  */
  @Delete(':id')
  @ApiOperation({ summary: 'Borrar permanentemente una post reunión por id' })
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyPostMeeting.send(PostMeetingMSG.DELETE, id);
  }
}
