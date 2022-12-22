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

@Controller('api/meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @MessagePattern(MeetingMSG.CREATE)
  create(@Payload() meetingDTO: MeetingDTO) {
    return this.meetingService.create(meetingDTO);
  }

  @MessagePattern(MeetingMSG.FIND_ALL)
  findAll() {
    return this.meetingService.findAll();
  }

  @MessagePattern(MeetingMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.meetingService.findOne(id);
  }

  @MessagePattern(MeetingMSG.UPDATE)
  update(@Payload() payload) {
    return this.meetingService.update(payload.id, payload.meetingDTO);
  }

  @MessagePattern(MeetingMSG.DELETE)
  delete(@Payload() id: string) {
    return this.meetingService.delete(id);
  }

  @MessagePattern(MeetingMSG.ADD_PROJECT)
  async setProject(@Payload() payload) {
    return this.meetingService.setProject(payload.meetingId,payload.projectId);
  }

  @MessagePattern(MeetingMSG.FIND_BY_PROJECT)
  findByProject(@Payload() id: string) {
    return this.meetingService.findByProject(id);
  }

}
