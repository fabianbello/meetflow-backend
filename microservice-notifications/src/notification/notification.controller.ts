import {
    Controller
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()

//Clase que representa las notificaciones del sistema
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) { }
    /* 
    Modelamiento estructural de datos:

        1. INotification:    Interface

        2. NotificationMSG:  Mensajeria por RabbitMQ

        3. notificationDTO:  NotificationDTO: Objeto de transferencia de datos 

        4. notificationService: servicio de notificaciones
    */

    // METODOS CRUD para notificaciones

    /*  
     Metodo para crear una nueva notificación.
     entrada: datos de la notificación. 
     salida: objeto de nueva notificación.  
     */
    @MessagePattern(NotificationMSG.CREATE)
    async create(@Payload() payload: any) {
        return await this.notificationService.create(payload);
    }

    /*  
    Metodo para obtener todas las notificaciones.
    salida: objeto de nueva notificación. 
    */
    @MessagePattern(NotificationMSG.FIND_ALL)
    async findAll() {
        return await this.notificationService.findAll();
    }

    /*  
    Metodo para  obtener una notificacion a partir de su id.
    entrada: id de la notificación. 
    salida: objeto de la notificación encontrada.  
    */
    @MessagePattern(NotificationMSG.FIND_ONE)
    async findOne(@Payload() id: string) {
        return await this.notificationService.findOne(id);
    }

    /*  
    Metodo para actualizar una notificación a partir de su id.
    entrada: id de la notificación y nuevos datos de la notificación. 
    salida: objeto de la notificacion actualizada.
    */
    @MessagePattern(NotificationMSG.UPDATE)
    async update(@Payload() payload: any) {
        return await this.notificationService.update(payload.id, payload.notificationDTO);
    }

    /*  
    Metodo para borrar permanentemente nueva notificación a partir de su id.
    entrada: id de la notificacion.
    salida: objeto de nueva notificación.
    */
    @MessagePattern(NotificationMSG.DELETE)
    async delete(@Payload() id: string) {
        return await this.notificationService.delete(id);
    }
    
    /*
    Metodo para enviar un correo a usuario externo
    */
    @MessagePattern('sendNotificationExternal')
    async sendNotificationExternal(@Payload() payload: any) {
        return this.notificationService.sendNotificationExternal(payload.meetingMinuteDTO, payload.user);
    }

    /*
    Metodo para enviar un correo a usuario invitados
    */
    @MessagePattern('sendNotification')
    async sendNotification(@Payload() payload: any) {
        return this.notificationService.sendNotification(payload.meetingMinuteDTO, payload.user);  
    }

    /*
    Metodo para enviar un correo a un recordatorio
    */
    @MessagePattern('sendNotificationRemember')
    async sendNotificationRemember(@Payload() payload: any) {
        return this.notificationService.sendNotificationRemember(payload.remember, payload.user);
    }

    /*
    Metodo para enviar un correo a un recordatorio de tarea
    */
    @MessagePattern('sendNotificationRememberTask')
    async sendNotificationRememberTask(@Payload() payload: any) {
        return this.notificationService.eventActivationTime(payload.remember, payload.remember.milisec, payload.user);   
    }

    /*
    Metodo para enviar una nueva contraseña al usuario 
    */
    @MessagePattern('SEND_PASS')
    async sendResetPass(@Payload() user: any) {
        return this.notificationService.sendResetPass(user);
    }
}
