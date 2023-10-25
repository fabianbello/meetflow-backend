import {
  Controller,
} from '@nestjs/common';
import { PreMeetingService } from './pre-meeting.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PreMeetingMSG } from 'src/common/constants';

@Controller()
export class PreMeetingController {
  constructor(
    private readonly preMeetingService: PreMeetingService,
  ) {}

  /* 
     Modelo estructural de datos:
  
         1. IPreMeeting:    Interface
  
         2. PreMeetingMSG:  Mensajeria por RabbitMQ
  
         3. preMeetingDTO:  PreMeetingDTO: Objeto de transferencia de datos 
  
  */

  // METODOS CRUD para pre reuniones

  /*  
  Método para crear una nueva pre reunión a partir de una reunión.
  entrada: datos de la pre reunión y el id de la reunión. 
  salida: objeto de nueva pre reunión.  
  */
  @MessagePattern(PreMeetingMSG.CREATE)
  async create(@Payload() preMeetingDTO: string
  ) {
      return this.preMeetingService.create(preMeetingDTO);
  }

  /*  
  Método para obtener todas las pre reuniones.
  salida: objeto de las pre reuniones encontradas. 
  */
  @MessagePattern(PreMeetingMSG.FIND_ALL)
  findAll() {
    return this.preMeetingService.findAll();
  }

   /*  
  Método para  obtener una pre reunión a partir del id.
  entrada: id de la pre reunión. 
  salida: objeto de la pre reunión encontrada.  
  */
  @MessagePattern(PreMeetingMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.preMeetingService.findOne(id);
  }

  /*  
  Metodo para actualizar una pre reunión a partir del id.
  entrada: id de la pre reunión y nuevos datos de la tarea. 
  salida: objeto de la pre reunión actualizada.
  */
  @MessagePattern(PreMeetingMSG.UPDATE)
  update(@Payload() payload) {
    return this.preMeetingService.update(payload.id, payload.preMeetingDTO);
  }
  
  /*  
  Método para borrar permanentemente una pre reunión a partir del id.
  entrada: id de la pre reunión.
  salida: valor booleano de confirmación.
  */
  @MessagePattern(PreMeetingMSG.DELETE)
  delete(@Payload() id: string) {
    return this.preMeetingService.delete(id);
  }

}
