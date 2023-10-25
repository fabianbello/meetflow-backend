import {
  Controller,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectMSG } from 'src/common/constants';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  /* 
  Modelo estructural de datos:

    1. IProject:    Interface

    2. ProjectMSG:  Mensajeria por RabbitMQ

    3. projectDTO:  ProjectDTO: Objeto de transferencia de datos 

  */

  // METODOS CRUD para proyectos

  /*  
  Método para crear un nueva proyecto a partir de un usuario. 
  (se autoasigna como jefe de proyecto al usuario que crea el proyecto)
  entrada: datos del proyecto (nombre corto). 
  salida: objeto de nueva proyecto.  
  */
  @MessagePattern(ProjectMSG.CREATE)
  async create(@Payload() payload: any) {
    return await this.projectService.createProject(payload);
  }

  /*  
  Método para  obtener todos los proyectos
  */
  @MessagePattern(ProjectMSG.FIND_ALL)
  async findAll() {
    return await this.projectService.findAll();
  }

  /*  
  Método para  obtener un proyecto a partir del id.
  entrada: id del proyecto. 
  salida: objeto del proyecto encontrada.  
  */
  @MessagePattern(ProjectMSG.FIND_ONE)
  async findOne(@Payload() id: string) {
    return await this.projectService.findOne(id);
  }

  /*  
  Método para actualizar un proyecto a partir del id.
  entrada: id del proyecto y nuevos datos del proyecto. 
  salida: objeto del proyecto actualizada.
  */
  @MessagePattern(ProjectMSG.UPDATE)
  async update(@Payload() payload: any) {
    return await this.projectService.update(payload.id, payload.projectDTO);
  }

  /*  
  Método para borrar permanentemente un proyecto a partir del id.
  entrada: id del proyecto.
  salida: valor booleano de confirmación.
  */
  @MessagePattern(ProjectMSG.DELETE)
  async delete(@Payload() id: string) {
    return await this.projectService.delete(id);
  }

  /*  
  Método para añadir un invitado al proyecto.
  entrada: id del proyecto e id del invitado
  salida: objeto del proyecto con nuevo invitado añadido.  
  */
  @MessagePattern(ProjectMSG.ADD_GUEST)
  async addGuest(@Payload() payload) {
    return await this.projectService.addGuest(payload.projectId, payload.guestId);
  }

  /*  
  Método para obtener todos los proyectos de un usuario por su id
  entrada: id del usuario que solicita
  salida: objeto del proyecto encontrado.  
  */
  @MessagePattern('LIST_PROJECTS')
  async listProjectByUser(@Payload() payload) {
    return await this.projectService.findAllForUser(payload);
  }

  /*  
  Método para añadir un miembro al proyecto
  entrada: email del usuario a añadir
  salida: objeto del proyecto encontrado.  
  */
  @MessagePattern(ProjectMSG.ADD_MEMBER)
  async addMember(
    @Payload() payload: any
  ) {
    return this.projectService.addMember(payload.projectId, payload.memberEmail);
  }
}
