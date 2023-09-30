import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IElement } from 'src/common/interfaces/element.interface';
import { ELEMENT } from 'src/common/models/models';
import { ElementDTO } from './dto/element.dto';

@Injectable()
export class ElementService {


  constructor(
    @InjectModel(ELEMENT.name)
    private readonly model: Model<IElement>,
  ) { }

  /*   async create(preMeetingDTO: PreMeetingDTO): Promise<IPreMeeting> {
      const newMeetingMinute = new this.model(preMeetingDTO);
      return await newMeetingMinute.save();
    } */

  async create(elementDTO: ElementDTO) {
    const newElement = new this.model(elementDTO);
    console.log("ELEMENTO AÑADIDO!: ", newElement);
    return await newElement.save();
  }

  async findAll(): Promise<IElement[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IElement> {
    return await this.model.findById(id);
  }

  async findByMeeting(id: string): Promise<IElement[]> {
    return await this.model.where({ meeting: [id] });
  }

  async findByProject(id: string): Promise<IElement[]> {
    return await this.model.where({ project: [id] })
  }

  async findByUser(id: string): Promise<IElement[]> {
    return await this.model.where({ participants: [id] })
  }

  async findByUserProject(emailUser: string, idProject): Promise<IElement[]> {
    let tasksAux = await this.model.where({ participants: [emailUser], project: idProject, type: 'compromiso' });
    console.log("ESTOS SON LAS TAREAS OBTENIDAS: ", tasksAux)
    return await this.model.where({ participants: [emailUser], project: idProject, type: 'compromiso' })
  }

  async filterTasks(emailUser: string, idProject: string, state: string): Promise<IElement[]> {
   /*  let tasksAux = await this.model.where({ participants: [emailUser], project: idProject, type: 'compromiso' });
    console.log("ESTOS SON LAS TAREAS FILTRADAS: ", tasksAux) */

    if(state==='all'){
      if(emailUser === 'all'){
        return await this.model.where({ project: idProject, type: 'compromiso' })
      }else{
        if(idProject === 'all'){
          return await this.model.where({ participants: [emailUser], type: 'compromiso' })
        }else{
          return await this.model.where({ participants: [emailUser], project: idProject, type: 'compromiso' })
        }
      }
    }else{
      if(emailUser === 'all'){
        return await this.model.where({ project: idProject, type: 'compromiso', state: state })
      }else{
        if(idProject === 'all'){
          return await this.model.where({ participants: [emailUser], type: 'compromiso', state: state })
        }else{
          return await this.model.where({ participants: [emailUser], project: idProject, type: 'compromiso', state: state })
        }
       
      }
      }
   
  }


  // ELEMENTOS PREVIOS
  async findByProjectPreview(id: string): Promise<IElement[]> {
    return await this.model.where({ project: [id], state: ['desarrollo', 'new', 'pausada', 'evaluando' ] })
  }


  async update(id: string, elementDTO: ElementDTO): Promise<IElement> {
    return await this.model.findByIdAndUpdate(id, elementDTO, {
      new: true,
    });
  }

  async delete(id: string): Promise<any> {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }


  async addMeetingMinute(
    inMeetingId: String,
    meetingMinuteId: string,
  ): Promise<IElement> {


    return await this.model.findByIdAndUpdate(
      inMeetingId,
      {
        $addToSet: { meetingMinutes: meetingMinuteId },
      },
      { new: true },
    );
  }


}
