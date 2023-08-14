import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyArray, Model } from 'mongoose';
import { IMeetingMinute } from 'src/common/interfaces/meeting-minute.interface';
import { MEETINGMINUTE } from 'src/common/models/models';
import { MeetingMinuteDTO } from './dto/meeting-minute.dto';

@Injectable()
export class MeetingMinuteService {

  constructor(
    @InjectModel(MEETINGMINUTE.name)
    private readonly model: Model<IMeetingMinute>
  ) {}

  async create(meetingMinuteDTO: MeetingMinuteDTO, user: any): Promise<IMeetingMinute> {
    
    meetingMinuteDTO.secretaries = user.email;
    const newMeetingMinute = new this.model(meetingMinuteDTO);
    console.log("MINUTA CREADA: ", newMeetingMinute);
    return await newMeetingMinute.save();
  }

  async sendNotification(meetingMinuteDTO: MeetingMinuteDTO, user: any): Promise<IMeetingMinute> {
    
    const newMeetingMinute = new this.model(meetingMinuteDTO);
    console.log("MINUTA CREADA: ", newMeetingMinute, user);
  
    return await newMeetingMinute;
  }

  async findAll(): Promise<IMeetingMinute[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<any> {
    const meetingMinute = await this.model.find({ meeting: id });
    console.log("OBTENEMOS LA SIGUIENTE MEETING MINUTE!", meetingMinute);
    console.log("OBTENEMOS LA SIGUIENTE MEETING MINUTE!", meetingMinute)
    return meetingMinute;
  }

  async update(
    id: string,
    meetingMinuteDTO: MeetingMinuteDTO,
  ): Promise<IMeetingMinute> {
    return await this.model.findByIdAndUpdate(id, meetingMinuteDTO, {
      new: true,
    });
  }

  async delete(id: string): Promise<any>{
    await this.model.findByIdAndDelete(id);
    return {
        status: HttpStatus.OK,
        msg: 'Deleted'
    }
  }
}
