import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReminder } from 'src/common/interfaces/reminder.interface';
import { REMINDER } from 'src/common/models/models';
import { ReminderDTO } from './dto/reminder.dto';

@Injectable()
export class ReminderService {

    constructor(
        @InjectModel(REMINDER.name)
        private readonly model: Model<IReminder>,
    ) { }

    /*   async create(preMeetingDTO: PreMeetingDTO): Promise<IPreMeeting> {
        const newMeetingMinute = new this.model(preMeetingDTO);
        return await newMeetingMinute.save();
      } */

    async create(reminderDTO: ReminderDTO) {
        const newReminder = new this.model(reminderDTO);
        console.log("RECORDATORIO AÑADIDO!: ", newReminder);
        return await newReminder.save();
    }

    async findAll(): Promise<IReminder[]> {
        return await this.model.find();
    }

    async findOne(id: string): Promise<IReminder[]> {
        return await this.model.where({email: [id]})
    }

    async findByMeeting(id: string): Promise<IReminder[]> {
        return await this.model.where({ meeting: [id] });
    }

    async findByProject(id: string): Promise<IReminder[]> {
        return await this.model.where({ project: [id] })
    }

    async findByUser(id: string): Promise<IReminder[]> {
        return await this.model.where({ participants: [id] })
    }

    async findByProjectPreview(id: string): Promise<IReminder[]> {
        return await this.model.where({ project: [id], state: 'new' })
    }


    async update(id: string, reminderDTO: ReminderDTO): Promise<IReminder> {
        return await this.model.findByIdAndUpdate(id, reminderDTO, {
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
    ): Promise<IReminder> {


        return await this.model.findByIdAndUpdate(
            inMeetingId,
            {
                $addToSet: { meetingMinutes: meetingMinuteId },
            },
            { new: true },
        );
    }
}
