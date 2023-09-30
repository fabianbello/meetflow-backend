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
  ) { }

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
  // ELEMENTOS PREVIOS
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

  @MessagePattern(ElementMSG.FIND_BY_USER_PROJECT)
  findByUserProject(@Payload() payload: any) {
    console.log("OBTIENEDO LAS TAREAS PARA: " + payload.emailUser + ' en el proyecto: ' + payload.idProject)
    return this.elementService.findByUserProject(payload.emailUser, payload.idProject);
  }


  @MessagePattern(ElementMSG.FIND_BY_T_PROJECT)
  filterTasks(@Payload() payload: any) {
    console.log("FILTRANDO LAS TAREAS PARA: " + payload.emailUser + ' en el proyecto: ' + payload.idProject + ' estdo: '+ payload.state);
    return this.elementService.filterTasks(payload.emailUser, payload.idProject, payload.nameState);
  }



}
