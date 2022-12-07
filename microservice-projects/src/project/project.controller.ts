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
import { ProjectDTO } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  create(@Body() projectDTO: ProjectDTO) {
    return this.projectService.create(projectDTO);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() projectDTO: ProjectDTO) {
    return this.projectService.update(id, projectDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }

  /* @Post(':projectId/guest/:guestId')
  async addGuest(
    @Param('projectId') projectId: string,
    @Param('guestId') guestId: string,
  ) {
    const guest = await this.guestService.findOne(guestId);
    if (!guest) {
      throw new HttpException('Guest no encontrado', HttpStatus.NOT_FOUND);
    } else {
      return this.projectService.addGuest(projectId, guestId);
    }
  } */
}
