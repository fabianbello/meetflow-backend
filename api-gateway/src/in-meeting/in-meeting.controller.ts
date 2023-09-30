
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { IInMeeting } from 'src/common/interfaces/in-meeting.interface';
import { Observable } from 'rxjs';
import { InMeetingMSG } from 'src/common/constants';
import { InMeetingDTO } from './dto/in-meeting.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Microservicio de en-reuniones (microservice-inmeetings)')
@Controller('api/in-meeting')
export class InMeetingController {

  // Entrada: cliente proxy global
  constructor(private readonly clientProxy: ClientProxyMeetflow) { }

  // cliente proxy de en reunión
  private _clientProxyInMeeting = this.clientProxy.clientProxyInMeeting();

  /* 
Modelo estructural de datos:

    1. IInMeeting:    Interface

    2. InMeetingMSG:  Mensajeria por RabbitMQ

    3. inMeetingDTO:  InMeetingDTO: Objeto de transferencia de datos 

*/

  // METODOS CRUD para en reuniones

  /*  
  Metodo para crear una nueva fase de en reunión.
  entrada: datos de la en reunión. 
  salida: objeto de nueva en reunión.  
  */
  @Post('/:meetingId')
  @ApiOperation({ summary: 'Crear una en-reunión' })
  create(@Param('meetingId') meetingId: string): Observable<IInMeeting> {
    return this._clientProxyInMeeting.send(InMeetingMSG.CREATE, meetingId);
  }

  /*  
 Metodo para obtener todas las fases de en reuniones.
 salida: objeto de reuniones encotradas. 
 */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las en-reuniones' })
  findAll(): Observable<IInMeeting[]> {
    return this._clientProxyInMeeting.send(InMeetingMSG.FIND_ALL, '');
  }

  /*  
  Metodo para  obtener una en reunión a partir del id.
  entrada: id de la en reunión. 
  salida: objeto de la en reunión encontrada.  
  */

  @Get(':id')
  @ApiOperation({ summary: 'Obtener en-reunión por id' })
  findOne(@Param('id') id: string): Observable<IInMeeting> {
    return this._clientProxyInMeeting.send(InMeetingMSG.FIND_ONE, id);
  }

  /*  
     Metodo para actualizar una en reunión a partir del id.
     entrada: id de la en reunión y nuevos datos de la en reunión. 
     salida: objeto de la notificacion actualizada.
  */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar en-reunión por id' })
  update(
    @Param('id') id: string,
    @Body() inMeetingDTO: InMeetingDTO,
  ): Observable<IInMeeting> {
    return this._clientProxyInMeeting.send(InMeetingMSG.UPDATE, {
      id,
      inMeetingDTO,
    });
  }

  /*  
  Metodo para borrar permanentemente una en reunión a partir del id.
  entrada: id de la notificacion.
  salida: valor booleano de confirmación.
  */
  @Delete(':id')
  @ApiOperation({ summary: 'Borrar permanentemente una en-reunión por id' })
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyInMeeting.send(InMeetingMSG.DELETE, id);
  }
}
