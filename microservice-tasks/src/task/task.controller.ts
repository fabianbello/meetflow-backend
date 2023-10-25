import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskMSG } from 'src/common/constants';

@Controller()
export class TaskController {

  constructor(private readonly taskService: TaskService) { }

  // IMPORTANTE!!!! EN MEETFLOW FRONTEND SE UTILIZAN LOS METODOS DE ELEMENTOS PARA TRABAJAR TAREAS
  // IMPORTANTE!!!! EN MEETFLOW FRONTEND SE UTILIZAN LOS METODOS DE ELEMENTOS PARA TRABAJAR TAREAS

  /* 
    Modelo estructural de datos:

       1. Itask:    Interface

       2. TaskMSG:  Mensajeria por RabbitMQ

       3. taskDTO:  TaskDTO: Objeto de transferencia de datos 

    */

  // METODOS CRUD para tareas

  /*  
   Metodo para crear una nueva tarea.
   entrada: datos de la tarea. 
   salida: objeto de nueva tarea.  
  */
  @MessagePattern(TaskMSG.CREATE)
  async create(@Payload() payload: any) {
    return await this.taskService.create(payload);
  }

  /*  
   Metodo para obtener todas las tarea.
   salida: objeto de tareas encontradas. 
  */
  @MessagePattern(TaskMSG.FIND_ALL)
  async findAll() {
    return await this.taskService.findAll();
  }

  /*  
  Metodo para actualizar una tarea a partir del id.
  entrada: id de la tarea y nuevos datos de la tarea. 
  salida: objeto de la tarea actualizada.
 */
  @MessagePattern(TaskMSG.UPDATE)
  async update(@Payload() payload: any) {
    return await this.taskService.update(payload.id, payload.taskDTO);
  }

  /*  
Metodo para borrar permanentemente una tarea a partir del id.
entrada: id de la tarea.
salida: valor booleano de confirmación.
 */
  @MessagePattern(TaskMSG.DELETE)
  async delete(@Payload() id: string) {
    return await this.taskService.delete(id);
  }

  /*  
Metodo para crear tareas desde los elementos dialogicos como compromisos
entrada: elementos dialogicas de compromisos.
salida: tareas.
*/
  @MessagePattern('CREATE_TASKS_FOR_COMPROMISES')
  async tasksForCompromises(@Payload() payload: any) {
    console.log("LLEGAMOS AQUI", payload.compromises.reduce((acc) => acc + 1, 0));
    let tasks = [];
    for (let i = 0; i < payload.compromises.reduce((acc) => acc + 1, 0); i++) {
      this.taskService.tasksForCompromises(payload.compromises[i]);
    }
    return true;
  }
}
