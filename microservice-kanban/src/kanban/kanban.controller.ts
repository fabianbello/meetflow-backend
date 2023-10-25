import { Controller } from '@nestjs/common';
import {
    Body,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { KanbanDTO } from './dto/kanban.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KanbanMSG } from 'src/common/constants';

@Controller()
export class KanbanController {
    constructor(
        private readonly kanbanService: KanbanService,
    ) { }

    // IMPORTANTE!!!!! FUNCIONALIDADES NO IMPLEMENTADAS EN DETALLE
    // IMPORTANTE!!!!! FUNCIONALIDADES NO IMPLEMENTADAS EN DETALLE

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
    @MessagePattern(KanbanMSG.CREATE)
    async create(@Payload() payload: any) {
        return await this.kanbanService.create(payload);
    }

    /*  
     Método para obtener todos los tableros kanban.
     salida: objeto de kanban encontrados. 
    */
    @MessagePattern(KanbanMSG.FIND_ALL)
    async findAll() {
        return await this.kanbanService.findAll();
    }

    /*  
     Metodo para actualizar un tablero kanban a partir del id.
     entrada: id del kanban y nuevos datos del kanban. 
     salida: objeto del kanban actualizado.
     */
    @MessagePattern(KanbanMSG.UPDATE)
    async update(@Payload() payload: any) {
        return await this.kanbanService.update(payload.id, payload.taskDTO);
    }

    /*  
    Método para borrar permanentemente un tablero kanban a partir del id.
    entrada: id del kanban.
    salida: valor booleano de confirmación.
    */
    @MessagePattern(KanbanMSG.DELETE)
    async delete(@Payload() id: string) {
        return await this.kanbanService.delete(id);
    }

}
