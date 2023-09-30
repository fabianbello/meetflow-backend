import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { ElementDTO } from './dto/element.dto';
import { ElementMSG } from 'src/common/constants';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Microservicio de elementos dialógicos (microservice-elements)')
@Controller('api/element')
export class ElementController {

  // Entrada: cliente proxy global
  constructor(
    private readonly clientProxy: ClientProxyMeetflow
  ) { }

  // cliente proxy de elementos
  private _clientProxyElement =
    this.clientProxy.clientProxyElement();

  /* 
  Modelo estructural de datos:

    1. IElement:    Interface

    2. ElementMSG:  Mensajeria por RabbitMQ

    3. elementDTO:  ElementDTO: Objeto de transferencia de datos 

*/

  /*   @Post()
    create(@Body() preMeetingDTO: PreMeetingDTO) {
      return this.preMeetingService.create(preMeetingDTO);
    } */


  // METODOS CRUD para elementos

  /*  
   Metodo para crear un elemento.
   entrada: datos del elemento. 
   salida: objeto de nuevo elemento.  
  */
  @Post()
  @ApiOperation({ summary: 'Crear un elemento dialógico' })
  async create(
    @Body() elementDTO: ElementDTO
  ) {
    return this._clientProxyElement.send(ElementMSG.CREATE, elementDTO);
  }

  /*  
     Metodo para obtener todos los elementos.
     salida: objeto de elementos encontrados. 
    */
  @Get()
  @ApiOperation({ summary: 'Obtener todos los elementos dialógicos ' })
  findAll() {
    return this._clientProxyElement.send(ElementMSG.FIND_ALL, '');
  }

  /*  
     Metodo para  obtener un elemento a partir del email de usuarios encargados.
     entrada: id del usuario encargado. 
     salida: objeto del elemento encontrada.  
  */
  @Get('/participants/:id')
  @ApiOperation({ summary: 'Obtener elemento dialogico por id de usuario responsable' })
  findOne(@Param('id') id: string) {
    return this._clientProxyElement.send(ElementMSG.FIND_ONE, id);
  }

  /*  
    Metodo para  obtener un elemento a partir del id de la reunion.
    entrada: id de la reunion vinculada. 
    salida: objeto del elemento encontrado.  
   */
  @Get('/meeting/:id')
  @ApiOperation({ summary: 'Obtener elemento dialogico por id de reunión vinculada' })
  findByMeeting(@Param('id') id: string) {
    return this._clientProxyElement.send(ElementMSG.FIND_BY_MEET, id);
  }

  /*  
    Metodo para  obtener un elemento a partir del id del proyecto.
    entrada: id del proyecto vinculado. 
    salida: objeto del elemento encontrado.  
   */
  @Get('/project/:id')
  @ApiOperation({ summary: 'Obtener elemento dialogico por id de proyecto vinculado' })
  findByProject(@Param('id') id: string) {
    return this._clientProxyElement.send(ElementMSG.FIND_BY_PROJECT, id);
  }

    /*  
    Metodo para  obtener un elemento a partir del id del proyecto.
    entrada: id del proyecto vinculado. 
    salida: objeto del elemento encontrado.  
   */
    @Get('/project/:idProject/user/:emailUser/state/:nameState')
    @ApiOperation({ summary: 'Obtener elemento dialogico por id de proyecto vinculado' })
    findByTProject(@Param('idProject') idProject: string,  @Param('emailUser') emailUser: string,  @Param('nameState') nameState: string) {
      return this._clientProxyElement.send(ElementMSG.FIND_BY_T_PROJECT, {idProject, emailUser, nameState});
    }

  /*  
  Metodo para  obtener un elemento a partir del id del proyecto y email de usuario.
  entrada: id del proyecto vinculado. 
  salida: objeto del elemento encontrado.  
 */
  @Get('/project/:idProject/user/:emailUser')
  @ApiOperation({ summary: 'Obtener elemento dialogico por id de proyecto vinculado y email del usuario' })
  findByUserProject(@Param('idProject') idProject: string, @Param('emailUser') emailUser: string ) {
    return this._clientProxyElement.send(ElementMSG.FIND_BY_USER_PROJECT, {idProject, emailUser});
  }

  /*  
   Metodo para  obtener un elemento en estado no terminado a partir del id del proyecto.
   entrada: id del proyecto vinculado. 
   salida: objeto del elemento encontrado.  
  */
  @Get('/project/preview/:id')
  @ApiOperation({ summary: 'Obtener elemento dialogico en estado de no finalizado por id de proyecto vinculado' })
  findByProjectPrevew(@Param('id') id: string) {
    return this._clientProxyElement.send(ElementMSG.FIND_BY_PROJECT_PREVIEW, id);
  }


  /*  
  Metodo para actualizar un elemento a partir del id.
  entrada: id del elemento y nuevos datos del elemento. 
  salida: objeto del elemento actualizada.
 */
  @Put('/update/:id')
  @ApiOperation({ summary: 'Actualizar elemento dialógico por id' })
  update(@Param('id') id: string, @Body() elementDTO: ElementDTO) {
    const params = {
      id: id,
      elementDTO: elementDTO
    }
    return this._clientProxyElement.send(ElementMSG.UPDATE, params);
  }

  /*  
     Metodo para borrar permanentemente un elemento a partir del id.
     entrada: id del elemento.
     salida: valor booleano de confirmación.
      */
  @Delete(':id')
  @ApiOperation({ summary: 'Borrar permanentemente un elemento dialógico por id' })
  delete(@Param('id') id: string) {
    return this._clientProxyElement.send(ElementMSG.DELETE, id);
  }

  /*   @Post(':preMeetingId/meetingMinute/:meetingMinuteId')
    async addGuest(
      @Param('preMeetingId') preMeetingId: string,
      @Param('meetingMinuteId') meetingMinuteId: string,
    ) {
      const meetingMinute = await this.meetingMinuteService.findOne(
        meetingMinuteId,
      );
      if (!meetingMinute) {
        throw new HttpException('Minuta no encontrada', HttpStatus.NOT_FOUND);
      } else {
        return this.preMeetingService.addMeetingMinute(
          preMeetingId,
          meetingMinuteId,
        );
      }
    } */
}
