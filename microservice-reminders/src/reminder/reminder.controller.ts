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
import { ReminderDTO } from './dto/reminder.dto';
import { ReminderService } from './reminder.service';
import { ReminderMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('reminder')
export class ReminderController {

    constructor(private readonly reminderService: ReminderService) {}

  @MessagePattern(ReminderMSG.CREATE)
  async create(@Payload() payload: any) {
    console.log("NOS LLEGO ESTO PARA CREAR LOS RECORDATORIOS: ", payload);
    return await this.reminderService.create(payload);
  }

  @MessagePattern(ReminderMSG.FIND_ALL)
  async findAll() {
    return await this.reminderService.findAll();
  }

  @MessagePattern(ReminderMSG.FIND_ONE)
  async findOne(@Payload() id: string) {
    console.log("recivimos de que la api quiere los recordatorios de alguien")
    return await this.reminderService.findOne(id);
  }

  @MessagePattern(ReminderMSG.UPDATE)
  async update(@Payload() payload: any) {
    return await this.reminderService.update(payload.id, payload.reminderDTO);
  }

  @MessagePattern(ReminderMSG.DELETE)
  async delete(@Payload() id: string) {
    return await this.reminderService.delete(id);
  }
}
