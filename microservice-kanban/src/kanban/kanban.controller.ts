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


    @MessagePattern(KanbanMSG.CREATE)
    async create(@Payload() payload: any) {
        return await this.kanbanService.create(payload);
    }

    @MessagePattern(KanbanMSG.FIND_ALL)
    async findAll() {
        return await this.kanbanService.findAll();
    }

/*     @MessagePattern(KanbanMSG.FIND_ONE)
    async findOne(@Payload() id: string) {
        return await this.kanbanService.findOne(id);
    }
 */
    @MessagePattern(KanbanMSG.UPDATE)
    async update(@Payload() payload: any) {
        return await this.kanbanService.update(payload.id, payload.taskDTO);
    }

    @MessagePattern(KanbanMSG.DELETE)
    async delete(@Payload() id: string) {
        return await this.kanbanService.delete(id);
    }


}
