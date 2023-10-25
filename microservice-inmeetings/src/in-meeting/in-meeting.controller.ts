import { Controller } from '@nestjs/common';
import { InMeetingService } from './in-meeting.service';
import { InMeetingDTO } from './dto/in-meeting.dto';
import { InMeetingMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class InMeetingController {

  constructor(
    private readonly inMeetingService: InMeetingService,

  ) { }

  /* 
    Modelo estructural de datos:

    1. IInMeeting:    Interface

    2. InMeetingMSG:  Mensajeria por RabbitMQ

    3. inMeetingDTO:  InMeetingDTO: Objeto de transferencia de datos 

  */

  // METODOS CRUD para en reuniones

  /*  
  Método para crear una nueva fase de en reunión.
  entrada: datos de la en reunión. 
  salida: objeto de nueva en reunión.  
  */
  @MessagePattern(InMeetingMSG.CREATE)
  async create(@Payload() inMeetingDTO: string
  ) {
    return this.inMeetingService.create(inMeetingDTO);
  }

  /*  
  Metodo para obtener todas las fases de en reuniones.
  salida: objeto de reuniones encotradas. 
  */
  @MessagePattern(InMeetingMSG.FIND_ALL)
  findAll() {
    return this.inMeetingService.findAll();
  }

  /*  
  Metodo para  obtener una en reunión a partir del id.
  entrada: id de la en reunión. 
  salida: objeto de la en reunión encontrada.  
  */
  @MessagePattern(InMeetingMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.inMeetingService.findOne(id);
  }

  /*  
  Metodo para actualizar una en reunión a partir del id.
  entrada: id de la en reunión y nuevos datos de la en reunión. 
  salida: objeto de la notificacion actualizada.
  */
  @MessagePattern(InMeetingMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.inMeetingService.update(payload.id, payload.inMeetingDTO);
  }

  /*  
  Metodo para borrar permanentemente una en reunión a partir del id.
  entrada: id de la notificacion.
  salida: valor booleano de confirmación.
  */
  @MessagePattern(InMeetingMSG.DELETE)
  delete(@Payload() id: string) {
    return this.inMeetingService.delete(id);
  }

}
