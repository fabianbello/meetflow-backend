import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MeetingDTO } from './dto/meeting.dto';
import { MeetingService } from './meeting.service';

@Controller('api/meeting')
export class MeetingController {

    constructor( private readonly meetingService: MeetingService){

    }

    @Post()
    create(@Body() meetingDTO: MeetingDTO){
        return this.meetingService.create(meetingDTO);
    }

    @Get()
    findAll(){
        return this.meetingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.meetingService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() meetingDTO: MeetingDTO){
        return this.meetingService.update(id, meetingDTO);
    }

    @Delete(':id')
    delete(@Param('id') id : string){
        return this.meetingService.delete(id);
    }

   /*  @Post(':meetingId/project/:projectId')
  async setProject(
    @Param('meetingId') meetingId: string,
    @Param('projectId') projectId: string,
  ) {
    const project = await this.projectService.findOne(projectId);
    if (!project) {
      throw new HttpException('Proyeecto no encontrada', HttpStatus.NOT_FOUND);
    } else {
      return this.meetingService.setProject(meetingId, projectId);
    }
  } */
}
