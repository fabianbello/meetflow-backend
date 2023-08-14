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

@Controller('api/reminder')
export class ReminderController {

    constructor(private readonly clientProxy: ClientProxyMeetflow) { }

    // REminders
    private _clientProxyReminder = this.clientProxy.clientProxyReminder();

    @Post('/create')
    create(@Body() reminderDTO: ReminderDTO): Observable<IReminder> {
        return this._clientProxyReminder.send(ReminderMSG.CREATE, reminderDTO);
    }


    @Get('/:id')
    async findOne(@Param('id') id: string) {
        console.log('solicitamos los recordatorios para un usuario');
        return await this._clientProxyReminder.send(ReminderMSG.FIND_ONE, id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() reminderDTO: ReminderDTO,
    ): Promise<Observable<IReminder>> {
        return await this._clientProxyReminder.send(ReminderMSG.UPDATE, { id, reminderDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyReminder.send(ReminderMSG.DELETE, id);
    }
}
