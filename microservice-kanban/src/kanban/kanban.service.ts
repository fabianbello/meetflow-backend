import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IKanban } from 'src/common/interfaces/kanban.interface';
import { KANBAN } from 'src/common/models/models';
import { KanbanDTO } from './dto/kanban.dto';

@Injectable()
export class KanbanService {

  constructor(
    @InjectModel(KANBAN.name)
    private readonly model: Model<IKanban>,
  ) { }

  /*   async create(preMeetingDTO: PreMeetingDTO): Promise<IPreMeeting> {
      const newMeetingMinute = new this.model(preMeetingDTO);
      return await newMeetingMinute.save();
    } */

  async create(kanbanDTO: KanbanDTO) {
    const newKanban = new this.model(kanbanDTO);
    console.log("Creando kanban ", newKanban);
    return await newKanban.save();
  }

  async findAll(): Promise<any> {
    console.log("Visualización de Kanban");
    /* return await this.model.find(); */
    let params = {
      state: 'en desarrollo'
    }
    return params;
  }

  async findOne(id: string): Promise<any> {
    let params = {
      state: 'en desarrollo'
    }
    return params;
  }

  async findByMeeting(id: string): Promise<IKanban[]> {
    return await this.model.where({ meeting: [id] });
  }

  async findByProject(id: string): Promise<IKanban[]> {
    return await this.model.where({ project: [id] })
  }

  async findByUser(id: string): Promise<IKanban[]> {
    return await this.model.where({ participants: [id] })
  }

  async findByProjectPreview(id: string): Promise<IKanban[]> {
    return await this.model.where({ project: [id], state: 'new' })
  }


  async update(id: string, kanbanDTO: KanbanDTO): Promise<IKanban> {
    return await this.model.findByIdAndUpdate(id, kanbanDTO, {
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
  ): Promise<IKanban> {


    return await this.model.findByIdAndUpdate(
      inMeetingId,
      {
        $addToSet: { meetingMinutes: meetingMinuteId },
      },
      { new: true },
    );
  }
}
