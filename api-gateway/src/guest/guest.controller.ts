import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { GuestMSG } from 'src/common/constants';
import { IGuest } from 'src/common/interfaces/guest.interface';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { GuestDTO } from './dto/guest.dto';

@ApiTags('guests')
@Controller('api/guest')
export class GuestController {
  constructor(private readonly clientProxy: ClientProxyMeetflow) {}

  // Invitados
  private _clientProxyGuest = this.clientProxy.clientProxyGuest();

  @Post()
  create(@Body() guestDTO: GuestDTO): Observable<IGuest> {
    return this._clientProxyGuest.send(GuestMSG.CREATE, guestDTO);
  }

  @Get()
  findAll(): Observable<IGuest[]> {
    return this._clientProxyGuest.send(GuestMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IGuest> {
    return this._clientProxyGuest.send(GuestMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() guestDTO: GuestDTO,
  ): Observable<IGuest> {
    return this._clientProxyGuest.send(GuestMSG.UPDATE, { id, guestDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyGuest.send(GuestMSG.DELETE, id);
  }
}
