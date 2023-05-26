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
import { ProjectMSG } from 'src/common/constants';
import { ProjectDTO } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern(ProjectMSG.CREATE)
  create(@Payload() projectDTO: ProjectDTO) {
    return this.projectService.create(projectDTO);
  }

  @MessagePattern(ProjectMSG.FIND_ALL)
  findAll() {
    return this.projectService.findAll();
  }

  @MessagePattern(ProjectMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.projectService.findOne(id);
  }

  @MessagePattern(ProjectMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.projectService.update(payload.id, payload.projectDTO);
  }

  @MessagePattern(ProjectMSG.DELETE)
  delete(@Payload() id: string) {
    return this.projectService.delete(id);
  }

  @MessagePattern(ProjectMSG.ADD_GUEST)
  addGuest(@Payload() payload) {
    return this.projectService.addGuest(payload.projectId, payload.guestId);
  }

  @MessagePattern('LIST_PROJECTS')
  listProjectByUser(@Payload() payload) {
    console.log('HOLAAAAAAAAAAAAAAAAAAAAA');
    console.log("PAYLOAD: ", payload);

    return this.projectService.findAllForUser(payload);

  }
    /*   return this.projectService.addGuest(payload.projectId, payload.guestId); */
}
