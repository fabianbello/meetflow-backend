
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
import { PostMeetingService } from './post-meeting.service';
import { PostMeetingDTO } from './dto/post-meeting.dto';
import { PostMeetingMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller()
export class PostMeetingController {
    constructor(
        private readonly postMeetingService: PostMeetingService,
      ) {}
    
    /*   @Post()
      create(@Body() preMeetingDTO: PreMeetingDTO) {
        return this.preMeetingService.create(preMeetingDTO);
      } */
    
      @MessagePattern(PostMeetingMSG.CREATE)
      async create(@Payload() meetingId: string
   
      ) {
          return this.postMeetingService.create(meetingId);
      }
    
      @MessagePattern(PostMeetingMSG.FIND_ALL)
      findAll() {
        return this.postMeetingService.findAll();
      }
    
      @MessagePattern(PostMeetingMSG.FIND_ONE)
      findOne(@Payload() id: string) {
        return this.postMeetingService.findOne(id);
      }
    
      @MessagePattern(PostMeetingMSG.UPDATE)
      update(@Payload() payload: any) {
        return this.postMeetingService.update(payload.id, payload.postMeetingDTO);
      }
      
    
      @MessagePattern(PostMeetingMSG.DELETE)
      delete(@Payload() id: string) {
        return this.postMeetingService.delete(id);
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
