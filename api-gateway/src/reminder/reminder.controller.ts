import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { ReminderDTO } from './dto/reminder.dto';
import { ReminderMSG } from 'src/common/constants';
import { IReminder } from 'src/common/interfaces/reminder.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Microservicio de recordatorios (microservice-reminders)')
@Controller('api/reminder')
//Clase que representa los recordatorios del sistema
export class ReminderController {

      // Entrada: cliente proxy global
    constructor(private readonly clientProxy: ClientProxyMeetflow) { }

     // cliente proxy de recordatorios
    private _clientProxyReminder = this.clientProxy.clientProxyReminder();


    /* 
     Modelo estructural de datos:

       1. IReminder:    Interface

       2. ReminderMSG:  Mensajeria por RabbitMQ

       3. reminderDTO:  ReminderDTO: Objeto de transferencia de datos 

   */

    // METODOS CRUD para recordatorios

    /*  
    Metodo para crear una nueva recordatorio.
    entrada: datos del recordatorio. 
    salida: objeto de nueva recordatorio.  
    */
    @Post('/create')
    @ApiOperation({ summary: 'Crear un recordatorio' })
    create(@Body() reminderDTO: ReminderDTO): Observable<IReminder> {
        return this._clientProxyReminder.send(ReminderMSG.CREATE, reminderDTO);
    }

   /*  
    Metodo para  obtener una recordatorio a partir del id.
    entrada: id del recordatorio. 
    salida: objeto del recordatorio encontrada.  
    */
    @Get('/:id')
    @ApiOperation({ summary: 'Obtener recordatorio por id' })
    async findOne(@Param('id') id: string) {
        console.log('solicitamos los recordatorios para un usuario');
        return await this._clientProxyReminder.send(ReminderMSG.FIND_ONE, id);
    }

    /*  
    Metodo para actualizar un recordatorio a partir del id.
    entrada: id del recordatorio y nuevos datos del recordatorio. 
    salida: objeto de la recordatorio actualizada.
    */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar recordatorio por id' })
    async update(
        @Param('id') id: string,
        @Body() reminderDTO: ReminderDTO,
    ): Promise<Observable<IReminder>> {
        return await this._clientProxyReminder.send(ReminderMSG.UPDATE, { id, reminderDTO });
    }

    /*  
    Metodo para borrar permanentemente el recordatorio a partir del id.
    entrada: id del recodatorio.
    salida: valor booleano de confirmación.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente un recordatorio por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyReminder.send(ReminderMSG.DELETE, id);
    }
}
