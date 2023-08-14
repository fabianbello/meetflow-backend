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
import { PreMeetingDTO } from './dto/pre-meeting.dto';
import { PreMeetingService } from './pre-meeting.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PreMeetingMSG } from 'src/common/constants';

@Controller()
export class PreMeetingController {
  constructor(
    private readonly preMeetingService: PreMeetingService,
  ) {}

/*   @Post()
  create(@Body() preMeetingDTO: PreMeetingDTO) {
    return this.preMeetingService.create(preMeetingDTO);
  } */

  @MessagePattern(PreMeetingMSG.CREATE)
  async create(@Payload() preMeetingDTO: string
  ) {
      return this.preMeetingService.create(preMeetingDTO);
  }

  @MessagePattern(PreMeetingMSG.FIND_ALL)
  findAll() {
    return this.preMeetingService.findAll();
  }

  @MessagePattern(PreMeetingMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.preMeetingService.findOne(id);
  }

  @MessagePattern(PreMeetingMSG.UPDATE)
  update(@Payload() payload) {
    return this.preMeetingService.update(payload.id, payload.preMeetingDTO);
  }
  

  @MessagePattern(PreMeetingMSG.DELETE)
  delete(@Payload() id: string) {
    return this.preMeetingService.delete(id);
  }

/*   @Post(':preMeetingId/meetingMinute/:meetingMinuteId')
  async addGuest(
    @Param('preMeetingId') preMeetingId: string,
    @Param('meetingMinuteId') meetingMinuteId: string,
  ) {
    const meetingMinute = await this.meetingMinuteService.findOne(
      meetingMinuteId,
    );
    if (!meetingMinute) {
      throw new HttpException('Minuta no encontrada', HttpStatus.NOT_FOUND);
    } else {
      return this.preMeetingService.addMeetingMinute(
        preMeetingId,
        meetingMinuteId,
      );
    }
  } */
}
