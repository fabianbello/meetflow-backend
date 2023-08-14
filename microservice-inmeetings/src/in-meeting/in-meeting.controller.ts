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
import { InMeetingService } from './in-meeting.service';
import { InMeetingDTO } from './dto/in-meeting.dto';
import { InMeetingMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class InMeetingController {

    constructor(
        private readonly inMeetingService: InMeetingService,

      ) {}
    
    /*   @Post()
      create(@Body() preMeetingDTO: PreMeetingDTO) {
        return this.preMeetingService.create(preMeetingDTO);
      } */
    
      @MessagePattern(InMeetingMSG.CREATE)
      async create(@Payload() inMeetingDTO: string
      ) {
          return this.inMeetingService.create(inMeetingDTO);
      }
    
      @MessagePattern(InMeetingMSG.FIND_ALL)
      findAll() {
        return this.inMeetingService.findAll();
      }
    
      @MessagePattern(InMeetingMSG.FIND_ONE)
      findOne(@Payload() id: string) {
        return this.inMeetingService.findOne(id);
      }
    
      @MessagePattern(InMeetingMSG.UPDATE)
      update(@Payload() payload: any) {
        return this.inMeetingService.update(payload.id, payload.inMeetingDTO);
      }
      
    
      @MessagePattern(InMeetingMSG.DELETE)
      delete(@Payload() id: string) {
        return this.inMeetingService.delete(id);
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
