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
import { ElementService } from './element.service';
import { ElementDTO } from './dto/element.dto';
import { ElementMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ElementController {

    constructor(
        private readonly elementService: ElementService,
      ) {}
    
    /*   @Post()
      create(@Body() preMeetingDTO: PreMeetingDTO) {
        return this.preMeetingService.create(preMeetingDTO);
      } */
    
      @MessagePattern(ElementMSG.CREATE)
      async create(
        @Payload() elementDTO: ElementDTO
      ) {
          return this.elementService.create(elementDTO);
      }
    
      @MessagePattern(ElementMSG.FIND_ALL)
      findAll() {
        return this.elementService.findAll();
      }
    
      @MessagePattern(ElementMSG.FIND_ONE)
      findOne(@Payload() id: string) {
        return this.elementService.findByUser(id);
      }

      @MessagePattern(ElementMSG.FIND_BY_MEET)
      findByMeeting(@Payload() id: string) {
        return this.elementService.findByMeeting(id);
      }

      @MessagePattern(ElementMSG.FIND_BY_PROJECT)
      findByProject(@Payload() id: string) {
        return this.elementService.findByProject(id);
      }
    
      @MessagePattern(ElementMSG.FIND_BY_PROJECT_PREVIEW)
      findByProjectPrevew(@Payload() id: string) {
        return this.elementService.findByProjectPreview(id);
      }

      @MessagePattern(ElementMSG.UPDATE)
      update(@Payload() payload: any) {
        console.log("ELEMENTO A ACTUALIZAR: ", payload);
        return this.elementService.update(payload.id, payload.elementDTO);
      }
      
    
      @MessagePattern(ElementMSG.DELETE)
      delete(@Payload() id: string) {
        return this.elementService.delete(id);
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
