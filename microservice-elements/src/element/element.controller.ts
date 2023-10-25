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
import { ElementService } from './element.service';
import { ElementDTO } from './dto/element.dto';
import { ElementMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ElementController {

  constructor(
    private readonly elementService: ElementService,
  ) { }

  /* 
  Modelo estructural de datos:

    1. IElement:    Interface

    2. ElementMSG:  Mensajeria por RabbitMQ

    3. elementDTO:  ElementDTO: Objeto de transferencia de datos 

  */

   // METODOS CRUD para elementos

  /*  
  Método para crear un elemento.
  entrada: datos del elemento. 
  salida: objeto de nuevo elemento.  
  */
  @MessagePattern(ElementMSG.CREATE)
  async create(
    @Payload() elementDTO: ElementDTO
  ) {
    return this.elementService.create(elementDTO);
  }

  /*  
  Método para obtener todos los elementos.
  salida: objeto de elementos encontrados. 
  */
  @MessagePattern(ElementMSG.FIND_ALL)
  findAll() {
    return this.elementService.findAll();
  }

  /*  
  Método para  obtener elementos a partir del email de usuarios encargados.
  entrada: id del usuario encargado. 
  salida: objeto del elemento encontrada.  
  */
  @MessagePattern(ElementMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.elementService.findByUser(id);
  }

  /*  
  Método para  obtener elementos a partir del id de la reunion.
  entrada: id de la reunion vinculada. 
  salida: objeto del elemento encontrado.  
  */
  @MessagePattern(ElementMSG.FIND_BY_MEET)
  findByMeeting(@Payload() id: string) {
    return this.elementService.findByMeeting(id);
  }

  /*  
  Método para  obtener elementos a partir del id del proyecto.
  entrada: id del proyecto vinculado. 
  salida: objeto del elemento encontrado.  
  */
  @MessagePattern(ElementMSG.FIND_BY_PROJECT)
  findByProject(@Payload() id: string) {
    return this.elementService.findByProject(id);
  }
  
  /*  
   Método para  obtener los elementos en estado no terminado a partir del id del proyecto.
   entrada: id del proyecto vinculado. 
   salida: objeto del elemento encontrado.  
  */
  @MessagePattern(ElementMSG.FIND_BY_PROJECT_PREVIEW)
  findByProjectPrevew(@Payload() id: string) {
    return this.elementService.findByProjectPreview(id);
  }

  /*  
   Método para obtener los compromisos a partir del id de la reunión
   entrada: id de la reunión asociado
   salida: objeto del elemento encontrado.  
  */
  @MessagePattern('FIND_COMPROMISES_BY_MEET')
  findCompromisesByMeeting(@Payload() id: string) {
    return this.elementService.findCompromisesByMeeting(id);
  }

  /*  
  Método para actualizar un elemento a partir del id.
  entrada: id del elemento y nuevos datos del elemento. 
  salida: objeto del elemento actualizada.
  */
  @MessagePattern(ElementMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.elementService.update(payload.id, payload.elementDTO);
  }

  /*  
  Método para borrar permanentemente un elemento a partir del id.
  entrada: id del elemento.
  salida: valor booleano de confirmación.
  */
  @MessagePattern(ElementMSG.DELETE)
  delete(@Payload() id: string) {
    return this.elementService.delete(id);
  }

  /*  
  Metodo para  obtener un elemento a partir del id del proyecto y email de usuario.
  entrada: id del proyecto vinculado. 
  salida: objeto del elemento encontrado.  
  */
  @MessagePattern(ElementMSG.FIND_BY_USER_PROJECT)
  findByUserProject(@Payload() payload: any) {
    return this.elementService.findByUserProject(payload.emailUser, payload.idProject);
  }

  /*  
  Método para  obtener un elemento a partir del id del proyecto, email de usuario y estado del elemento.
  entrada: id del proyecto vinculado. 
  salida: objeto del elemento encontrado.  
  */
  @MessagePattern(ElementMSG.FIND_BY_T_PROJECT)
  filterTasks(@Payload() payload: any) {
    return this.elementService.filterTasks(payload.emailUser, payload.idProject, payload.nameState);
  }

}
