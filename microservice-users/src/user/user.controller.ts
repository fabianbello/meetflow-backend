import {
  Controller,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {

  // Metodo de instanciacion de la clase UserController
  constructor(private userService: UserService, private readonly jwtService: JwtService) { }

  /* 
  Modelo estructural de datos:

      1. UserMSG:  Mensajeria por RabbitMQ

      2. userDTO:  UserDTO: Objeto de transferencia de datos 

  */

  // METODOS CRUD para usuarios

  /*  
   Método para crear un nuevo usuario.
   entrada: datos del usuario. 
   salida: objeto del nuevo usuario.  
  */
  @MessagePattern(UserMSG.CREATE)
  async create(@Payload() userDTO: UserDTO) {
    const user = await this.userService.create(userDTO);
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  /*  
  Método para obtener todos los usuarios registrados.
  salida: llista con todos los usuarios registrados.  
  */
  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  /*  
  Método para obtener un usuario a partir del id.
  entrada: id del usuario. 
  salida: objeto del usuario encontrado.  
  */
  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  /*  
  Método para  obtener un usuario a partir del email.
  entrada: email del usuario. 
  salida: objeto del usuario encontrado.  
  */
  @MessagePattern('USER_BY_EMAIL')
  findOneByEmail(@Payload() email: string) {
    return this.userService.findOneByEmail(email);
  }

  /*  
  Método para actualizar un usuario a partir del id.
  entrada: id del usuario y nuevos datos del usuario. 
  salida: objeto del usuario actualizada.
  */
  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.userService.update(payload.id, payload.userDTO);
  }

  /*  
  Método para actualizar el color de un usuario
  entrada: usuario y su color
  salida: usuario con color actualizado
  */
  @MessagePattern('UPDATE_COLOR')
  updateColor(@Payload() payload: any) {
    return this.userService.updateColor(payload.id, payload.userDTO);
  }

  /*  
  Método para actualizar la última seccion del usuario
  entrada: usuario y sus datos
  salida: usuario actualizado
  */
  @MessagePattern('UPDATE_SECTION')
  updateCurrentSection(@Payload() payload: any) {
    return this.userService.updateCurrentSection(payload.id, payload.userDTO);
  }

  /*  
  Método para borrar permanentemente un usuario a partir del id.
  entrada: id del usuario.
  salida: valor booleano de confirmación.
  */
  @MessagePattern(UserMSG.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }

  /*  
  Método para validar el ingreso de un usuario a la plataforma.
  entrada: email y contraseña de un usuario.
  salida: usuario validado o invalidado.
   */
  @MessagePattern(UserMSG.VALID_USER)
  async validateUseri(@Payload() payload): Promise<any> {
    // buscar usuario por email
    const user = await this.userService.findOneByEmail(payload.email);
    if (user) {
      // validar contraseña ingresada vs la encontrada en base de datos
      const isValidPassword = await this.userService.checkPassword(
        payload.password,
        user.password,
      );
      if (isValidPassword) {
        return user;
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
  }

  /*  
  Método para resetear la contraseña a una nueva y enviarla por correo electronico
  entrada: email del usuario que solicita restablecer contraseña
  salida: usuario con contraseña nueva generada aleatoriamente
   */
  @MessagePattern('RESET_PASS')
  async resetPassword(@Payload() payload): Promise<any> {
    const user = await this.userService.requestResetPassword(payload);
    if (user) {
      return user;
    }
    else {
      return null;
    }
  }

  /*  
  Método para calcular la cantidad de usuarios totales en la plataforma
  salida: cantidad de usuarios
   */
  @MessagePattern('countusers')
  async countUsers(@Payload() payload): Promise<any> {
    return await this.userService.countUsers();
  }

}
