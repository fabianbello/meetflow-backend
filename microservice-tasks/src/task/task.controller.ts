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
import { TaskService } from './task.service';
import { TaskDTO } from './dto/task.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskMSG } from 'src/common/constants';

@Controller()
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

  @MessagePattern(TaskMSG.CREATE)
  async create(@Payload() payload: any) {
    return await this.taskService.create(payload);
  }

  @MessagePattern(TaskMSG.FIND_ALL)
  async findAll() {
    return await this.taskService.findAll();
  }
/* 
  @MessagePattern(TaskMSG.FIND_ONE)
  async findOne(@Payload() id: string) {
    return await this.taskService.findOne(id);
  } */

  @MessagePattern(TaskMSG.UPDATE)
  async update(@Payload() payload: any) {
    return await this.taskService.update(payload.id, payload.taskDTO);
  }

  @MessagePattern(TaskMSG.DELETE)
  async delete(@Payload() id: string) {
    return await this.taskService.delete(id);
  }
}
