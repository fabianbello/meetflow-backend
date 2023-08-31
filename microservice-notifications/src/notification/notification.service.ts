import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationMSG } from 'src/common/constants';
import { INotification } from 'src/common/interfaces/notification.interface';
import { NOTIFICATION } from 'src/common/models/models';
import { NotificationDTO } from './dto/notification.dto';

@Injectable()
export class NotificationService {

    constructor(
        @InjectModel(NOTIFICATION.name)
        private readonly model: Model<INotification>,
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

}
