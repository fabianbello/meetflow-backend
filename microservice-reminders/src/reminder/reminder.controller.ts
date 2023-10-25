import { Controller } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ReminderMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ReminderController {

  constructor(private readonly reminderService: ReminderService) { }


  /* 
   Modelo estructural de datos:

     1. IReminder:    Interface

     2. ReminderMSG:  Mensajeria por RabbitMQ

     3. reminderDTO:  ReminderDTO: Objeto de transferencia de datos 

 */

  // METODOS CRUD para recordatorios

  /*  
  Método para crear una nueva recordatorio.
  entrada: datos del recordatorio. 
  salida: objeto de nueva recordatorio.  
  */
  @MessagePattern(ReminderMSG.CREATE)
  async create(@Payload() payload: any) {
    console.log("NOS LLEGO ESTO PARA CREAR LOS RECORDATORIOS: ", payload);
    return await this.reminderService.create(payload);
  }

  /*  
    Método para  obtener todos los recordatorios
  */
  @MessagePattern(ReminderMSG.FIND_ALL)
  async findAll() {
    return await this.reminderService.findAll();
  }

   /*  
    Método para  obtener una recordatorio a partir del id.
    entrada: id del recordatorio. 
    salida: objeto del recordatorio encontrada.  
    */
  @MessagePattern(ReminderMSG.FIND_ONE)
  async findOne(@Payload() id: string) {
    console.log("recivimos de que la api quiere los recordatorios de alguien")
    return await this.reminderService.findOne(id);
  }

  /*  
    Método para actualizar un recordatorio a partir del id.
    entrada: id del recordatorio y nuevos datos del recordatorio. 
    salida: objeto de la recordatorio actualizada.
  */
  @MessagePattern(ReminderMSG.UPDATE)
  async update(@Payload() payload: any) {
    return await this.reminderService.update(payload.id, payload.reminderDTO);
  }

  /*  
    Metodo para borrar permanentemente el recordatorio a partir del id.
    entrada: id del recodatorio.
    salida: valor booleano de confirmación.
  */
  @MessagePattern(ReminderMSG.DELETE)
  async delete(@Payload() id: string) {
    return await this.reminderService.delete(id);
  }
}
