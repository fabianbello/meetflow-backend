import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    /*  
     Metodo para crear una nueva notificación.
     entrada: datos de la notificación. 
     salida: objeto de nueva notificación.  
     */
    async create(notificationDTO: NotificationDTO) {
        const newNotification = new this.model(notificationDTO);
        return await newNotification.save();
    }

    /*  
    Metodo para obtener todas las notificaciones.
    salida: objeto de nueva notificación. 
    */
    async findAll(): Promise<INotification[]> {
        return await this.model.find();
    }

    /*  
    Metodo para  obtener una notificacion a partir de su id.
    entrada: id de la notificación. 
    salida: objeto de la notificación encontrada.  
    */
    async findOne(id: string): Promise<INotification[]> {
        return await this.model.where({ email: [id] })
    }

    /*  
    Metodo para actualizar una notificación a partir de su id.
    entrada: id de la notificación y nuevos datos de la notificación. 
    salida: objeto de la notificacion actualizada.
    */
    async update(id: string, notificationDTO: NotificationDTO): Promise<INotification> {
        return await this.model.findByIdAndUpdate(id, notificationDTO, {
            new: true,
        });
    }

    /*  
    Metodo para borrar permanentemente nueva notificación a partir de su id.
    entrada: id de la notificacion.
    salida: objeto de nueva notificación.
    */
    async delete(id: string): Promise<any> {
        await this.model.findByIdAndDelete(id);
        return {
            status: HttpStatus.OK,
            msg: 'Deleted',
        };
    }

    /*
    Metodo para enviar un correo a usuario externo
    */
    async sendNotificationExternal(meetingMinuteDTO: any, user: any): Promise<any> {
        let params = {
            meetingminute: meetingMinuteDTO,
            users: user
        }
        return await this.eventEmitter2.emit('meetingMinute.inviteExternal', meetingMinuteDTO, user);
    }

    /*
    Metodo para enviar un correo a usuario invitados
    */
    async sendNotification(meetingMinuteDTO: any, user: any): Promise<any> {
        let params = {
            meetingminute: meetingMinuteDTO,
            user: user
        }
        return await this.eventEmitter2.emit('meetingMinute.created', meetingMinuteDTO, user);
    }

    /*
    Metodo para enviar un correo a un recordatorio
    */
    async sendNotificationRemember(remember: any, user: any): Promise<any> {
        let params = {
            remember: remember,
            users: user
        }
        return await this.eventEmitter2.emit('meetingMinute.rembember', remember, user);
    }

    /*
    Metodo para enviar un correo a un recordatorio de tarea
    */
    async sendNotificationRememberTask(remember: any, user: any): Promise<any> {
        let params = {
            remember: remember,
            users: user
        }
        return await this.eventEmitter2.emit('meetingMinute.rembember', remember, user);
    }

    /*
    Metodo para enviar un correo a un recordatorio de tarea
    */
    eventActivationTime(remember: any, miliseg: number, user: any) {
        setTimeout(async () => {
            await this.eventEmitter2.emit('meetingMinute.rembemberTask', remember, user);
        }, miliseg);
        return true;
    }

    /*
    Metodo para enviar una nueva contraseña al usuario
    */
    sendResetPass(user: any) {
        return this.eventEmitter2.emit('auth.resetpass', user);
    }

}
