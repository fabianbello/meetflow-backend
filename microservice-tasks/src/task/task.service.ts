import { HttpStatus, Injectable } from '@nestjs/common';
import { ITask } from 'src/common/interfaces/task.interface';
import { TaskDTO } from './dto/task.dto';
import { Model } from 'mongoose';
import { TASK } from 'src/common/models/models';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {

    constructor(
        @InjectModel(TASK.name)
        private readonly model: Model<ITask>,
    ) { }

    /*  
     Metodo para crear una nueva tarea.
     entrada: datos de la tarea. 
     salida: objeto de nueva tarea.  
    */
    async create(taskDTO: TaskDTO) {
        const newTask = new this.model(taskDTO);
        console.log("ELEMENTO AÑADIDO!: ", newTask);
        return await newTask.save();
    }

    /*  
   Metodo para obtener todas las tarea.
   salida: objeto de tareas encontradas. 
  */
    async findAll(): Promise<any> {
        console.log("Visualización de tarea");
        let params = {
            state: 'en desarrollo'
        }
        return params;
    }

    /*  
     Metodo para actualizar una tarea a partir del id.
    entrada: id de la tarea y nuevos datos de la tarea. 
     salida: objeto de la tarea actualizada.
    */
    async update(id: string, taskDTO: TaskDTO): Promise<ITask> {
        return await this.model.findByIdAndUpdate(id, taskDTO, {
            new: true,
        });
    }

    /*  
    Metodo para borrar permanentemente una tarea a partir del id.
    entrada: id de la tarea.
    salida: valor booleano de confirmación.
    */
    async delete(id: string): Promise<any> {
        await this.model.findByIdAndDelete(id);
        return {
            status: HttpStatus.OK,
            msg: 'Deleted',
        };
    }

    /*  
    Metodo para crear tareas desde los elementos dialogicos como compromisos
    entrada: elementos dialogicas de compromisos.
    salida: tareas.
    */
    async tasksForCompromises(taskDTO: any) {
        console.log('[SERVICE TASK] Se ha guardado como tarea', taskDTO)
        const newTask = new this.model(taskDTO);
        return await newTask.save();
    }

}
