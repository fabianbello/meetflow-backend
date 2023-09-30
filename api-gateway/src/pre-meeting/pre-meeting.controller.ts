import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { PreMeetingDTO } from './dto/pre-meeting.dto';
import { IPreMeeting } from 'src/common/interfaces/pre-meeting.interface';
import { Observable } from 'rxjs/internal/Observable';
import { PreMeetingMSG } from 'src/common/constants';
import { IMeeting } from 'src/common/interfaces/meeting.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Microservicio de pre-reuniones (microservice-premeetings)')
@Controller('api/pre-meeting')
export class PreMeetingController {
  // Entrada: cliente proxy global
  constructor(private readonly clientProxy: ClientProxyMeetflow) { }

  // cliente proxy de pre reunión
  private _clientProxyPreMeeting = this.clientProxy.clientProxyPreMeeting();

  /* 
     Modelo estructural de datos:
  
         1. IPreMeeting:    Interface
  
         2. PreMeetingMSG:  Mensajeria por RabbitMQ
  
         3. preMeetingDTO:  PreMeetingDTO: Objeto de transferencia de datos 
  
  */

  // METODOS CRUD para pre reuniones

  /*  
   Metodo para crear una nueva pre reunión a partir de una reunión.
   entrada: datos de la pre reunión y el id de la reunión. 
   salida: objeto de nueva pre reunión.  
  */
  @Post('/:meetingId')
  @ApiOperation({ summary: 'Crear una pre reunión a partir del id de la reunión' })
  create(@Param('meetingId') meetingId: string): Observable<IPreMeeting> {
    return this._clientProxyPreMeeting.send(PreMeetingMSG.CREATE, meetingId);
  }

  /*  
     Metodo para obtener todas las pre reuniones.
     salida: objeto de las pre reuniones encontradas. 
    */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las pre reuniones' })
  findAll(): Observable<IMeeting[]> {
    return this._clientProxyPreMeeting.send(PreMeetingMSG.FIND_ALL, '');
  }

  /*  
     Metodo para  obtener una pre reunión a partir del id.
     entrada: id de la pre reunión. 
     salida: objeto de la pre reunión encontrada.  
    */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener pre reunión por id' })
  findOne(@Param('id') id: string): Observable<IPreMeeting> {
    return this._clientProxyPreMeeting.send(PreMeetingMSG.FIND_ONE, id);
  }

  /*  
    Metodo para actualizar una pre reunión a partir del id.
    entrada: id de la pre reunión y nuevos datos de la tarea. 
    salida: objeto de la pre reunión actualizada.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar pre reunión por id' })
  update(
    @Param('id') id: string,
    @Body() preMeetingDTO: PreMeetingDTO,
  ): Observable<IPreMeeting> {
    return this._clientProxyPreMeeting.send(PreMeetingMSG.UPDATE, { id, preMeetingDTO });
  }

  /*  
   Metodo para borrar permanentemente una pre reunión a partir del id.
   entrada: id de la pre reunión.
   salida: valor booleano de confirmación.
    */
  @Delete(':id')
  @ApiOperation({ summary: 'Borrar permanentemente una pre reunión por id' })
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyPreMeeting.send(PreMeetingMSG.DELETE, id);
  }


}
