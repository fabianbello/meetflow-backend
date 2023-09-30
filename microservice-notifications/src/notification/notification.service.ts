import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationMSG } from 'src/common/constants';
import { INotification } from 'src/common/interfaces/notification.interface';
import { NOTIFICATION } from 'src/common/models/models';
import { NotificationDTO } from './dto/notification.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationService {

    constructor(
        @InjectModel(NOTIFICATION.name)
        private readonly model: Model<INotification>,
        private readonly eventEmitter2: EventEmitter2
    ) { }

    /* 
    Modelamiento estructural de datos:

        1. INotification:    Interface

        2. NotificationMSG:  Mensajeria por RabbitMQ

        3. notificationDTO:  NotificationDTO: Objeto de transferencia de datos 

        4. notificationService: servicio de notificaciones

    */


    async create(notificationDTO: NotificationDTO) {
        const newNotification = new this.model(notificationDTO);
        console.log("RECORDATORIO AÑADIDO!: ", newNotification);
        return await newNotification.save();
    }

    async findAll(): Promise<INotification[]> {
        return await this.model.find();
    }

    async findOne(id: string): Promise<INotification[]> {
        return await this.model.where({ email: [id] })
    }

    async update(id: string, notificationDTO: NotificationDTO): Promise<INotification> {
        return await this.model.findByIdAndUpdate(id, notificationDTO, {
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


    async sendNotificationExternal(meetingMinuteDTO: any, user: any): Promise<any> {
        let params = {
            meetingminute: meetingMinuteDTO,
            users: user
        }
        console.log("[service notifications] ENVIANDO CORREO", meetingMinuteDTO, user);

        return await this.eventEmitter2.emit('meetingMinute.inviteExternal', meetingMinuteDTO, user);
    }

    async sendNotification(meetingMinuteDTO: any, user: any): Promise<any> {

        let params = {
            meetingminute: meetingMinuteDTO,
            user: user
        }

        console.log("[MEETING MINUTE SERVICE DESDE API] ESTOY ENVIANDO LO SIGUIENTE COMO EVENTO: ", meetingMinuteDTO, user);

        return await this.eventEmitter2.emit('meetingMinute.created', meetingMinuteDTO, user);
    }

    async sendNotificationRemember(remember: any, user: any): Promise<any> {

        let params = {
            remember: remember,
            users: user
        }

        console.log("[MEETING MINUTE SERVICE DESDE API] ESTOY ENVIANDO LO SIGUIENTE COMO EVENTO: ", remember, user);

        return await this.eventEmitter2.emit('meetingMinute.rembember', remember, user);

    }

    async sendNotificationRememberTask(remember: any, user: any): Promise<any> {

        let params = {
          remember: remember,
          users: user
        }
    
        console.log("[MEETING MINUTE SERVICE DESDE API] ESTOY ENVIANDO LO SIGUIENTE COMO EVENTO: ", remember, user);
    
        return await this.eventEmitter2.emit('meetingMinute.rembember', remember, user);
    
      }


}
