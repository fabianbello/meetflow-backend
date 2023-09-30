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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { UserDTO } from './dto/user.dto';
import { Request } from 'express';

@ApiTags('Microservicio de usuarios (microservice-users)')
@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController {

  // Entrada: cliente proxy global
  constructor(private readonly clientProxy: ClientProxyMeetflow) { }

  // cliente proxy de usuarios
  private _clientProxyUser = this.clientProxy.clientProxyUser();


  /* 
  Modelo estructural de datos:

      1. IUser:    Interface

      2. UserMSG:  Mensajeria por RabbitMQ

      3. userDTO:  UserDTO: Objeto de transferencia de datos 

  */

  // METODOS CRUD para usuarios

  /*  
   Metodo para crear un nuevo usuario.
   entrada: datos del usuario. 
   salida: objeto del nuevo usuario.  
  */
  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  create(@Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
  }
  /*  
  Metodo para  obtener un usuario a partir del id.
  entrada: id del usuario. 
  salida: objeto del usuario encontrado.  
  */
  @Get('perfil/:id')
  @ApiOperation({ summary: 'Obtener usuario por id' })
  findOne(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  /*  
  Metodo para  obtener un usuario a partir del email.
  entrada: email del usuario. 
  salida: objeto del usuario encontrado.  
  */
  @Get('perfil/email/:email')
  @ApiOperation({ summary: 'obtener usuario por email' })
  findOneByEmail(@Param('email') email: string): Observable<any> {
    return this._clientProxyUser.send('USER_BY_EMAIL', email);
  }

  /*  
  Metodo para  obtener un usuario a partir del token JWT.
  entrada: token del usuario. 
  salida: objeto del usuario encontrado.  
  */
  @Get('/userLogin')
  @ApiOperation({ summary: 'obtener usuario por token JWT' })
  userLogin(@Req() req: any) {
    /*  console.log('ESTE ES EL USUARIO = ', req.user); */
    return req.user;
  }

  /* @Put(':id')
  update(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
  }
 */
  /*  
     Metodo para actualizar un usuario a partir del id.
     entrada: id del usuario y nuevos datos del usuario. 
     salida: objeto del usuario actualizada.
    */
  @Put('/update/:id')
  @ApiOperation({ summary: 'Actualizar usuario por id' })
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

  /*  
      Metodo para borrar permanentemente un usuario a partir del id.
      entrada: id del usuario.
      salida: valor booleano de confirmación.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Borrar permanentemente un usuario por id' })
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }

    /*  
      Metodo para borrar permanentemente un usuario a partir del id.
      entrada: id del usuario.
      salida: valor booleano de confirmación.
   */
      @Delete(':id')
      @ApiOperation({ summary: 'Borrar permanentemente un usuario por id' })
      getAll(@Param('id') id: string): Observable<any> {
        return this._clientProxyUser.send('allusers', id);
      }
    


}
