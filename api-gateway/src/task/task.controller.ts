import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { Observable } from 'rxjs';
import { TaskMSG } from 'src/common/constants';
import { ITask } from 'src/common/interfaces/task.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Microservicio de tareas (microservice-tasks)')
@Controller('api/task')
export class TaskController {

    // Entrada: cliente proxy global
    constructor(private readonly clientProxy: ClientProxyMeetflow) { }

    // cliente proxy de tasks
    private _clientProxyTask = this.clientProxy.clientProxyTask();

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
    @Post()
    @ApiOperation({ summary: 'Crear una tarea' })
    create(@Body() taskDTO: TaskDTO): Observable<ITask> {
        return this._clientProxyTask.send(TaskMSG.CREATE, taskDTO);
    }

    /*  
     Metodo para obtener todas las tarea.
     salida: objeto de tareas encontradas. 
    */
    @Get('/ver/tarea')
    @ApiOperation({ summary: 'Obtener todas las tareas' })
    async findAll() {
        console.log("Solicitando a microservicio tareas: visualización");
        return await this._clientProxyTask.send(TaskMSG.FIND_ALL, '');
    }

    /*  
     Metodo para  obtener una tarea a partir del id.
     entrada: id de la tarea. 
     salida: objeto de la tarea encontrada.  
    */
    @Get(':id')
    @ApiOperation({ summary: 'Obtener tarea por id' })
    async findOne(@Param('id') id: string) {

        return await this._clientProxyTask.send(TaskMSG.FIND_ONE, id);
    }

    /*  
    Metodo para actualizar una tarea a partir del id.
    entrada: id de la tarea y nuevos datos de la tarea. 
    salida: objeto de la tarea actualizada.
   */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar tarea por id' })
    async update(
        @Param('id') id: string,
        @Body() taskDTO: TaskDTO,
    ): Promise<Observable<ITask>> {
        return await this._clientProxyTask.send(TaskMSG.UPDATE, { id, taskDTO });
    }

    /*  
    Metodo para borrar permanentemente una tarea a partir del id.
    entrada: id de la tarea.
    salida: valor booleano de confirmación.
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente una tarea por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyTask.send(TaskMSG.DELETE, id);
    }
}
