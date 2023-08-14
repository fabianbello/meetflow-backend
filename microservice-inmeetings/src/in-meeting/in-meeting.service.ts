import { Injectable } from '@nestjs/common';
import { HttpStatus} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IInMeeting } from 'src/common/interfaces/in-meeting.interface';
import { INMEETING } from 'src/common/models/models';
import { InMeetingDTO } from './dto/in-meeting.dto';

@Injectable()
export class InMeetingService {

    constructor(
        @InjectModel(INMEETING.name)
        private readonly model: Model<IInMeeting>,
      ) {}
    
    /*   async create(preMeetingDTO: PreMeetingDTO): Promise<IPreMeeting> {
        const newMeetingMinute = new this.model(preMeetingDTO);
        return await newMeetingMinute.save();
      } */
    
      async create(meetingId: string){
        const params={
          meeting: meetingId,
          meetingMinute: 'acta dialogica'
        };
        const newInMeeting = new this.model(params);
        return await newInMeeting.save();
      }
    
      async findAll(): Promise<IInMeeting[]> {
        return await this.model.find();
      }
    
      async findOne(id: string): Promise<IInMeeting> {
        return await this.model.findById(id);
      }
    
      async update(id: string, inMeetingDTO: InMeetingDTO): Promise<IInMeeting> {
        return await this.model.findByIdAndUpdate(id, inMeetingDTO, {
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
      ): Promise<IInMeeting> {
    
    
        return await this.model.findByIdAndUpdate(
          inMeetingId,
          {
            $addToSet: { meetingMinutes: meetingMinuteId },
          },
          { new: true },
        );
      }
}
