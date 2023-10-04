import { HttpStatus, Injectable } from '@nestjs/common';
import { ITask } from 'src/common/interfaces/task.interface';
import { TaskDTO } from './dto/task.dto';
import { Model } from 'mongoose';
import { TASK } from 'src/common/models/models';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {

    constructor(
        @InjectModel(TASK.name)
        private readonly model: Model<ITask>,
    ) { }

    /*   async create(preMeetingDTO: PreMeetingDTO): Promise<IPreMeeting> {
        const newMeetingMinute = new this.model(preMeetingDTO);
        return await newMeetingMinute.save();
      } */

    async create(taskDTO: TaskDTO) {
        const newTask = new this.model(taskDTO);
        console.log("ELEMENTO AÑADIDO!: ", newTask);
        return await newTask.save();
    }

    async findAll(): Promise<any> {
        console.log("Visualización de tarea");
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

    async findByMeeting(id: string): Promise<ITask[]> {
        return await this.model.where({ meeting: [id] });
    }

    async findByProject(id: string): Promise<ITask[]> {
        return await this.model.where({ project: [id] })
    }

    async findByUser(id: string): Promise<ITask[]> {
        return await this.model.where({ participants: [id] })
    }

    async findByProjectPreview(id: string): Promise<ITask[]> {
        return await this.model.where({ project: [id], state: 'new' })
    }


    async update(id: string, taskDTO: TaskDTO): Promise<ITask> {
        return await this.model.findByIdAndUpdate(id, taskDTO, {
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

    async tasksForCompromises(taskDTO: any) {
        console.log('[SERVICE TASK] Se ha guardado como tarea',taskDTO)
        const newTask = new this.model(taskDTO);
        return await newTask.save();
    }

    async addMeetingMinute(
        inMeetingId: String,
        meetingMinuteId: string,
    ): Promise<ITask> {
        return await this.model.findByIdAndUpdate(
            inMeetingId,
            {
                $addToSet: { meetingMinutes: meetingMinuteId },
            },
            { new: true },
        );
    }
}
