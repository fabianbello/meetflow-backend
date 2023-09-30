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
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MeetingMSG } from 'src/common/constants';
import { MeetingDTO } from './dto/meeting.dto';
import { MeetingService } from './meeting.service';

@Controller()
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @MessagePattern(MeetingMSG.CREATE)
  async create(@Payload() meetingDTO: MeetingDTO) {
    return await this.meetingService.create(meetingDTO);
  }

  @MessagePattern(MeetingMSG.SET_STATE)
  async setState(@Payload() payload) {
    console.log("PAYLOAD.ID", payload.id);
    console.log("PAYLOAD.STATE", payload.state);
    return await this.meetingService.updateState(payload.id, payload.state);
  }


  @MessagePattern(MeetingMSG.FIND_ALL)
  async findAll() {
    return await this.meetingService.findAll();
  }

  @MessagePattern(MeetingMSG.FIND_ONE)
  async findOne(@Payload() id: string) {

    return await this.meetingService.findOne(id);
  }

  @MessagePattern(MeetingMSG.UPDATE)
  async update(@Payload() payload) {
    return await this.meetingService.update(payload.id, payload.meetingDTO);
  }

  @MessagePattern(MeetingMSG.DELETE)
  async delete(@Payload() id: string) {
    console.log("BORRANDO LA REUNION: ", id);
    return await this.meetingService.delete(id);
  }

  @MessagePattern(MeetingMSG.ADD_PROJECT)
  async setProject(@Payload() payload) {
    return await this.meetingService.setProject(payload.meetingId,payload.projectId);
  }

  @MessagePattern(MeetingMSG.FIND_BY_PROJECT)
  async findByProject(@Payload() id: string) {
    return await this.meetingService.findByProject(id);
  }

}
