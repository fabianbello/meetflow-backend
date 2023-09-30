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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Microservicio de Kanban (microservice-kanban)')
@Controller('api/kanban')
export class KanbanController {

    // Entrada: cliente proxy global
    constructor(private readonly clientProxy: ClientProxyMeetflow) { }

    // cliente proxy de kanban
    private _clientProxyKanban = this.clientProxy.clientProxyKanban();

    /* 
   Modelo estructural de datos:

       1. IKanban:    Interface

       2. KanbanMSG:  Mensajeria por RabbitMQ

       3. kanbanDTO:  KanbanDTO: Objeto de transferencia de datos 

   */

    // METODOS CRUD para kanban

    /*  
     Metodo para crear un kanban.
     entrada: datos del kanban. 
     salida: objeto de nueva kanban.  
    */
    @Post()
    @ApiOperation({ summary: 'Crear un tablero Kanban' })
    create(@Body() kanbanDTO: KanbanDTO): Observable<IKanban> {
        return this._clientProxyKanban.send(KanbanMSG.CREATE, kanbanDTO);
    }

    /*  
     Metodo para obtener todos los tableros kanban.
     salida: objeto de kanban encontrados. 
    */
    @Get('/ver/kanban')
    @ApiOperation({ summary: 'Obtener todos los tableros Kanban' })
    async findAll() {
        console.log("Solicitando a microservicio kanban: visualización");
        return await this._clientProxyKanban.send(KanbanMSG.FIND_ALL, '');
    }

    /*  
    Metodo para  obtener una kanban a partir del id.
    entrada: id del kanban. 
    salida: objeto del kanban encontrada.  
   */
    @Get(':id')
    @ApiOperation({ summary: 'Obtener tablero Kanban por id' })
    async findOne(@Param('id') id: string) {

        return await this._clientProxyKanban.send(KanbanMSG.FIND_ONE, id);
    }

    /*  
   Metodo para actualizar un tablero kanban a partir del id.
   entrada: id del kanban y nuevos datos del kanban. 
   salida: objeto del kanban actualizado.
  */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar tablero kanban por id' })
    async update(
        @Param('id') id: string,
        @Body() kanbanDTO: KanbanDTO,
    ): Promise<Observable<IKanban>> {
        return await this._clientProxyKanban.send(KanbanMSG.UPDATE, { id, kanbanDTO });
    }

    /*  
   Metodo para borrar permanentemente un tablero kanban a partir del id.
   entrada: id del kanban.
   salida: valor booleano de confirmación.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente un tablero Kanban por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyKanban.send(KanbanMSG.DELETE, id);
    }
}
