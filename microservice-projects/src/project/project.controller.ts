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
  async create(@Payload() payload: any) {
    return await this.projectService.createProject(payload);
  }

  @MessagePattern(ProjectMSG.FIND_ALL)
  async findAll() {
    return await this.projectService.findAll();
  }

  @MessagePattern(ProjectMSG.FIND_ONE)
  async findOne(@Payload() id: string) {
    console.log("SE NOS PIDE QUE DEVOLVAMOS UN PROYECTO POR EL ID: ", id);
    return await this.projectService.findOne(id);
  }

  @MessagePattern(ProjectMSG.UPDATE)
  async update(@Payload() payload: any) {
    return await this.projectService.update(payload.id, payload.projectDTO);
  }

  @MessagePattern(ProjectMSG.DELETE)
  async delete(@Payload() id: string) {
    return await this.projectService.delete(id);
  }

  @MessagePattern(ProjectMSG.ADD_GUEST)
  async addGuest(@Payload() payload) {
    return await this.projectService.addGuest(payload.projectId, payload.guestId);
  }

  @MessagePattern('LIST_PROJECTS')
  async listProjectByUser(@Payload() payload) {
    return await this.projectService.findAllForUser(payload);
  }

  @MessagePattern(ProjectMSG.ADD_MEMBER)
  async addMember(
    @Payload() payload:any
  ) {
/*     const member = await this.guestService.findOne(memberEmail);
    if (!member) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    } else {
      return this.projectService.addGuest(projectId, memberEmail);
    } */
    return this.projectService.addMember(payload.projectId, payload.memberEmail);
  }
    /*   return this.projectService.addGuest(payload.projectId, payload.guestId); */
}
