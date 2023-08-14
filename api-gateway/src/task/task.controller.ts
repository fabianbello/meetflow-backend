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

@Controller('api/task')
export class TaskController {

    constructor(private readonly clientProxy: ClientProxyMeetflow) { }

    // REminders
    private _clientProxyTask = this.clientProxy.clientProxyTask();

    @Post()
    create(@Body() taskDTO: TaskDTO): Observable<ITask> {
        return this._clientProxyTask.send(TaskMSG.CREATE, taskDTO);
    }

    @Get('/ver/tarea')
    async findAll() {
        console.log("Solicitando a microservicio tareas: visualización");

        return await this._clientProxyTask.send(TaskMSG.FIND_ALL, '');
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {

        return await this._clientProxyTask.send(TaskMSG.FIND_ONE, id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() taskDTO: TaskDTO,
    ): Promise<Observable<ITask>> {
        return await this._clientProxyTask.send(TaskMSG.UPDATE, { id, taskDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyTask.send(TaskMSG.DELETE, id);
    }
}
