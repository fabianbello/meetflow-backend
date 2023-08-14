import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPostMeeting } from 'src/common/interfaces/post-meeting.interface';
import { POSTMEETING } from 'src/common/models/models';
import { PostMeetingDTO } from './dto/post-meeting.dto';

@Injectable()
export class PostMeetingService {

    
    constructor(
        @InjectModel(POSTMEETING.name)
        private readonly model: Model<IPostMeeting>,
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
        const newPostMeeting = new this.model(params);
        return await newPostMeeting.save();
      }
    
      async findAll(): Promise<IPostMeeting[]> {
        return await this.model.find();
      }
    
      async findOne(id: string): Promise<IPostMeeting> {
        return await this.model.findById(id);
      }
    
      async update(id: string, postMeetingDTO: PostMeetingDTO): Promise<IPostMeeting> {
        return await this.model.findByIdAndUpdate(id, postMeetingDTO, {
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
      ): Promise<IPostMeeting> {
    
    
        return await this.model.findByIdAndUpdate(
          inMeetingId,
          {
            $addToSet: { meetingMinutes: meetingMinuteId },
          },
          { new: true },
        );
      }
}
