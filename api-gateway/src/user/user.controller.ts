import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { UserDTO } from './dto/user.dto';
import { Request } from 'express';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxyMeetflow) {}

  // Usuarios
  private _clientProxyUser = this.clientProxy.clientProxyUser();

  @Post()
  create(@Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
  }

 /*    @Get()
  findAll(): Observable<IUser[]> {
    return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
  } */

  @Get('perfil/:id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Get('perfil/email/:email')
  findOneByEmail(@Param('email') email: string): Observable<any> {
    return this._clientProxyUser.send('USER_BY_EMAIL', email);
  }

  @Get('/userLogin')
  userLogin(@Req() req: any) {
   /*  console.log('ESTE ES EL USUARIO = ', req.user); */
    return req.user;
  }

  /* @Put(':id')
  update(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
  }
 */
  @Put('/update/:id')
  update2(@Param('id') id: string, @Body() userDTO: any): Observable<IUser> {
 /*    console.log("UPDATE: userDTO:", userDTO);  */
   /*  console.log("[API] color recibido: ", userDTO.color) */
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
  }

/*   @Put('/update/current/:id')
  updateCurrent(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser> {
    console.log("UPDATE: userDTO:", userDTO); 
    return this._clientProxyUser.send(UserMSG.UPDATE_CURRENT, { id, userDTO });
  }
 */

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }


}
