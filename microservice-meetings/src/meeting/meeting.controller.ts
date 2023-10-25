import {
  Controller,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MeetingMSG } from 'src/common/constants';
import { MeetingDTO } from './dto/meeting.dto';
import { MeetingService } from './meeting.service';

@Controller()
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) { }

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
  @MessagePattern(MeetingMSG.CREATE)
  async create(@Payload() meetingDTO: MeetingDTO) {
    return await this.meetingService.create(meetingDTO);
  }

  /*  
  Método para asignar estado a la reunión
  entrada: datos del nuevo estado de la reunion y la id de la reunion a actualizar
  salida: objeto de reuniones actualizadas. 
  */
  @MessagePattern(MeetingMSG.SET_STATE)
  async setState(@Payload() payload) {
    return await this.meetingService.updateState(payload.id, payload.state);
  }

  /*  
  Método para obtener todas las reuniones.
  salida: objeto de reuniones encontradas. 
  */
  @MessagePattern(MeetingMSG.FIND_ALL)
  async findAll() {
    return await this.meetingService.findAll();
  }

  /*  
  Método para  obtener una reunión a partir del id.
  entrada: id de la reunión. 
  salida: objeto de la reunión encontrada.  
  */
  @MessagePattern(MeetingMSG.FIND_ONE)
  async findOne(@Payload() id: string) {

    return await this.meetingService.findOne(id);
  }

  /*  
  Método para actualizar una reunión a partir del id.
  entrada: id de la reunión y nuevos datos de la reunión. 
  salida: objeto de la reunión actualizada.
  */
  @MessagePattern(MeetingMSG.UPDATE)
  async update(@Payload() payload) {
    return await this.meetingService.update(payload.id, payload.meetingDTO);
  }

  /*  
  Método para borrar permanentemente una reunión a partir del id.
  entrada: id de la reunión.
  salida: valor booleano de confirmación.
  */
  @MessagePattern(MeetingMSG.DELETE)
  async delete(@Payload() id: string) {
    return await this.meetingService.delete(id);
  }

  /*  
  Método para vincular una reunión a un proyecto
  entrada: id del proyecto, id de la reunión
  salida: objeto de la reunión con el proyecto vinculado.
  */
  @MessagePattern(MeetingMSG.ADD_PROJECT)
  async setProject(@Payload() payload) {
    return await this.meetingService.setProject(payload.meetingId, payload.projectId);
  }

  /*  
  Método para  obtener runiones a partir del id de un proyecto.
  entrada: el id del proyecto. 
  salida: objeto de las reuniones encontrada para el proyecto.  
  */
  @MessagePattern(MeetingMSG.FIND_BY_PROJECT)
  async findByProject(@Payload() id: string) {
    return await this.meetingService.findByProject(id);
  }

  /*  
  Método para  obtener runiones a partir del id de un proyecto.
  entrada: el id del proyecto. 
  salida: objeto de las reuniones encontrada para el proyecto.  
  */
  @MessagePattern("FIND_BY_PROJECT_NUMBER")
  async findByProjectNumber(@Payload() payload: any) {
    return await this.meetingService.findByProjectNumber(payload.idProject, payload.numberMeet);
  }

  /*  
  Metodo para calcular la cantidad de reuniones totales en la plataforma.
  salida: cantidad de reuniones totales
  */
  @MessagePattern("countmeetings")
  async countMeetings(@Payload() payload: any) {
    return await this.meetingService.countMeetings();
  }

}
