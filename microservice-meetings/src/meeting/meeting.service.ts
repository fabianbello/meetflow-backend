import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMeeting } from 'src/common/interfaces/meeting.interface';
import { MEETING } from 'src/common/models/models';
import { MeetingDTO } from './dto/meeting.dto';

@Injectable()
export class MeetingService {

    constructor(
        @InjectModel(MEETING.name)
        private readonly model: Model<IMeeting>,
      ) {}
    
      async create(meetingDTO: MeetingDTO): Promise<IMeeting> {
        const newMeeting= new this.model(meetingDTO);
        return await newMeeting.save();
      }

      async updateState(id: string, statee: any): Promise<IMeeting> {
        console.log("ESTADO6", statee),
        console.log("ID de reunion", id)

        const juan: any = await this.model.findById(id);
        juan.state = statee.state;
        return await this.model.findByIdAndUpdate(
          id,
        juan,
          { new: true },
        );
      }
    
      async findAll(): Promise<IMeeting[]> {
        return await this.model.find();
      }
    
      async findOne(id: string): Promise<IMeeting> {
        return await this.model.findById(id);
      }

      async findByProject(id: string): Promise<IMeeting[]> {
        return await this.model.where({project: [id]})
      }
    
      async update(id: string, meetingDTO: MeetingDTO): Promise<IMeeting> {
        return await this.model.findByIdAndUpdate(id, meetingDTO, {
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
    
      async setProject(
        meetingId: String,
        projectId: string,
      ): Promise<IMeeting> {
        return await this.model.findByIdAndUpdate(
          meetingId,
          {
            $addToSet: { project: projectId },
          },
          { new: true },
        );
      }
}
