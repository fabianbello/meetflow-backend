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
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { ElementDTO } from './dto/element.dto';
import { ElementMSG } from 'src/common/constants';

@Controller('api/element')
export class ElementController {
    constructor(
        private readonly clientProxy: ClientProxyMeetflow
      ) {}

      private _clientProxyElement =
      this.clientProxy.clientProxyElement();
    
    /*   @Post()
      create(@Body() preMeetingDTO: PreMeetingDTO) {
        return this.preMeetingService.create(preMeetingDTO);
      } */
    
      @Post()
      async create(
        @Body() elementDTO: ElementDTO
      ) {
          return this._clientProxyElement.send(ElementMSG.CREATE ,elementDTO);
      }

      
    
      @Get()
      findAll() {
        return this._clientProxyElement.send(ElementMSG.FIND_ALL, '');
      }
    
      @Get('/participants/:id')
      findOne(@Param('id') id: string) {
        return this._clientProxyElement.send(ElementMSG.FIND_ONE, id);
      }

      @Get('/meeting/:id')
      findByMeeting(@Param('id') id: string) {
        return this._clientProxyElement.send(ElementMSG.FIND_BY_MEET, id);
      }

      @Get('/project/:id')
      findByProject(@Param('id') id: string) {
        return this._clientProxyElement.send(ElementMSG.FIND_BY_PROJECT,id);
      }
    
      @Get('/project/preview/:id')
      findByProjectPrevew(@Param('id') id: string) {
        return this._clientProxyElement.send(ElementMSG.FIND_BY_PROJECT_PREVIEW,id);
      }

      @Put('/update/:id')
      update(@Param('id') id: string, @Body() elementDTO: ElementDTO) {
        const params = {
            id: id,
            elementDTO: elementDTO
        }
        return this._clientProxyElement.send(ElementMSG.UPDATE, params);
      }
      
    
      @Delete(':id')
      delete(@Param('id') id: string) {
        return this._clientProxyElement.send(ElementMSG.DELETE, id);
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
