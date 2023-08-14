import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPreMeeting } from 'src/common/interfaces/pre-meeting.interface';
import { PREMEETING } from 'src/common/models/models';
import { PreMeetingDTO } from './dto/pre-meeting.dto';

@Injectable()
export class PreMeetingService {
  constructor(
    @InjectModel(PREMEETING.name)
    private readonly model: Model<IPreMeeting>,
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
    const newPreMeeting = new this.model(params);
    return await newPreMeeting.save();
  }

  async findAll(): Promise<IPreMeeting[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPreMeeting> {
    return await this.model.findById(id);
  }

  async update(id: string, preMeetingDTO: PreMeetingDTO): Promise<IPreMeeting> {
    return await this.model.findByIdAndUpdate(id, preMeetingDTO, {
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
    preMeetingId: String,
    meetingMinuteId: string,
  ): Promise<IPreMeeting> {


    return await this.model.findByIdAndUpdate(
      preMeetingId,
      {
        $addToSet: { meetingMinutes: meetingMinuteId },
      },
      { new: true },
    );
  }
}
