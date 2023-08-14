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
import { KanbanDTO } from './dto/kanban.dto';
import { Observable } from 'rxjs';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { KanbanMSG } from 'src/common/constants';
import { IKanban } from 'src/common/interfaces/kanban.interface';

@Controller('api/kanban')
export class KanbanController {

    
    constructor(private readonly clientProxy: ClientProxyMeetflow) { }

    // REminders
    private _clientProxyKanban = this.clientProxy.clientProxyKanban();

    @Post()
    create(@Body() kanbanDTO: KanbanDTO): Observable<IKanban> {
        return this._clientProxyKanban.send(KanbanMSG.CREATE, kanbanDTO);
    }

    @Get('/ver/kanban')
    async findAll() {
        console.log("Solicitando a microservicio kanban: visualización");
        return await this._clientProxyKanban.send(KanbanMSG.FIND_ALL, '');
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {

        return await this._clientProxyKanban.send(KanbanMSG.FIND_ONE, id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() kanbanDTO: KanbanDTO,
    ): Promise<Observable<IKanban>> {
        return await this._clientProxyKanban.send(KanbanMSG.UPDATE, { id, kanbanDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyKanban.send(KanbanMSG.DELETE, id);
    }
}
