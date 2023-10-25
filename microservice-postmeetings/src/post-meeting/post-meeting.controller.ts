
import { Controller } from '@nestjs/common';
import { PostMeetingService } from './post-meeting.service';
import { PostMeetingMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller()
export class PostMeetingController {
  constructor(
    private readonly postMeetingService: PostMeetingService,
  ) { }

  /* 
 Modelo estructural de datos:

     1. IPostMeeting:    Interface

     2. PostMeetingMSG:  Mensajeria por RabbitMQ

     3. postMeetingDTO:  PostMeetingDTO: Objeto de transferencia de datos 

 */

  // METODOS CRUD para notificaciones

  /*  
  Metodo para crear una nueva post reunión.
  entrada: datos de la post reunión. 
  salida: objeto de nueva post reunión.  
  */
  @MessagePattern(PostMeetingMSG.CREATE)
  async create(@Payload() meetingId: string
  ) {
    return this.postMeetingService.create(meetingId);
  }

  /*  
  Método para obtener todas las post reuniones.
  salida: objeto de post reuniones encontradas. 
  */
  @MessagePattern(PostMeetingMSG.FIND_ALL)
  findAll() {
    return this.postMeetingService.findAll();
  }

  /*  
  Método para  obtener una post reunión a partir del id.
  entrada: id de la post reunión. 
  salida: objeto de la post reunión encontrada.  
    */
  @MessagePattern(PostMeetingMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.postMeetingService.findOne(id);
  }

  /*  
  Método para actualizar una post reunión a partir del id.
  entrada: id de la post reunión y nuevos datos de la post reunión. 
  salida: objeto de la post reunión actualizada.
  */
  @MessagePattern(PostMeetingMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.postMeetingService.update(payload.id, payload.postMeetingDTO);
  }

  /*  
  Método para borrar permanentemente una post reunión a partir del id.
  entrada: id de la post reunión.
  salida: valor booleano de confirmación.
  */
  @MessagePattern(PostMeetingMSG.DELETE)
  delete(@Payload() id: string) {
    return this.postMeetingService.delete(id);
  }

}
