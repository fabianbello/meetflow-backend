import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProject } from 'src/common/interfaces/project.interface';
import { PROJECT } from 'src/common/models/models';
import { ProjectDTO } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(PROJECT.name) private readonly model: Model<IProject>,
  ) {}

  async createProject(projectDTO: any){

/*     const id = projectDTO.user.id;
    projectDTO.userOwner = projectDTO.user.email;
    projectDTO.userMembers = projectDTO.user.email; */
  
    const newProject = new this.model(projectDTO);
    return await newProject.save();

  }

  async findAll(): Promise<IProject[]> {
    return await this.model.find().populate('guests');
  }

  async findOne(id: string): Promise<IProject> {
    console.log("BUSCANDO EN BASE DE DATOS PROYECTO CON EL ID:", id);
    const projectById = await this.model.findById(id);
    console.log("ENCONTRAMOS EN LA BASE DE DATOS EL PROYECTO: ", projectById);
    return await this.model.findById(id);
    
  }

  async update(id: string, projectDTO: ProjectDTO): Promise<IProject> {
    return await this.model.findByIdAndUpdate(id, projectDTO, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }

  async addGuest(projectId: string, guestId: string): Promise<IProject> {
    return await this.model.findByIdAndUpdate(
      projectId,
      {
        $addToSet: { guests: guestId },
      },
      { new: true },
    ).populate('guests');
  }

  async findAllForUser(user: any){

    let projectsByUser = await this.model.find({"userMembers": user.email}); 
  
/*     console.log("PROYECTOS POR EL USUARIO ", user.email);
    console.log("PROYECTOS = ", projectsByUser); */
    return projectsByUser;

  }
  async addMember(projectId: string, memberEmail: string): Promise<IProject> {
    return await this.model.findByIdAndUpdate(
      projectId,
      {
        $addToSet: { userMembers: memberEmail },
      },
      { new: true },
    );
  }

}
