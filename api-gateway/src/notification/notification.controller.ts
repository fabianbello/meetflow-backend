import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { NotificationMSG } from 'src/common/constants';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { NotificationDTO } from './dto/notification.dto';
import { Observable } from 'rxjs';
import { INotification } from 'src/common/interfaces/notification.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Microservicio de notificaciones (microservice-notifications)')
@ApiBearerAuth()
@Controller('api/notification')
//Clase que representa las notificaciones del sistema
export class NotificationController {

    // Entrada: cliente proxy global
    constructor(private readonly clientProxy: ClientProxyMeetflow) { }

    // cliente proxy de notificaionces
    private _ClientProxyNotification = this.clientProxy.clientProxyNotification();

    /* 
    Modelo estructural de datos:

        1. INotification:    Interface

        2. NotificationMSG:  Mensajeria por RabbitMQ

        3. notificationDTO:  NotificationDTO: Objeto de transferencia de datos 

    */

    // METODOS CRUD para notificaciones

    /*  
    Metodo para crear una nueva notificación.
    entrada: datos de la notificación. 
    salida: objeto de nueva notificación.  
    */
    @Post()
    @ApiOperation({ summary: 'Crear una notificación' })
    async create(@Body() meetingDTO: NotificationDTO): Promise<Observable<INotification>> {
        return await this._ClientProxyNotification.send(NotificationMSG.CREATE, meetingDTO);
    }

    /*  
    Metodo para obtener todas las notificaciones.
    salida: objeto de notificaciones encontradas. 
    */
    @Get()
    @ApiOperation({ summary: 'Obtener todas las notificacines' })
    async findAll(): Promise<Observable<INotification[]>> {
        return await this._ClientProxyNotification.send(NotificationMSG.FIND_ALL, '');
    }

    /*  
    Metodo para  obtener una notificación a partir del id.
    entrada: id de la notificación. 
    salida: objeto de la notificación encontrada.  
    */
    @Get('/getNotificationByID/:id')
    @ApiOperation({ summary: 'Obtener notificación por id' })
    async findOne(@Param('id') id: string) {
        return await this._ClientProxyNotification.send(NotificationMSG.FIND_ONE, id);
    }

    /*  
    Metodo para actualizar una notificación a partir del id.
    entrada: id de la notificación y nuevos datos de la notificación. 
    salida: objeto de la notificacion actualizada.
    */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar notificación por id' })
    async update(
        @Param('id') id: string,
        @Body() notificationDTO: NotificationDTO,
    ): Promise<Observable<INotification>> {
        return await this._ClientProxyNotification.send(NotificationMSG.UPDATE, { id, notificationDTO });
    }

    /*  
    Metodo para borrar permanentemente una notificación a partir del id.
    entrada: id de la notificación.
    salida: valor booleano de confirmación.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente una notificación por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._ClientProxyNotification.send(NotificationMSG.DELETE, id);
    }

}
