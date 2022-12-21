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
    
      async findAll(): Promise<IMeeting[]> {
        return await this.model.find();
      }
    
      async findOne(id: string): Promise<IMeeting> {
        return await this.model.findById(id);
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
