import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService, private readonly jwtService: JwtService) {}



  @MessagePattern(UserMSG.CREATE)
  create(@Payload() userDTO: UserDTO) {
    console.log('users6516:',userDTO);
    return this.userService.create(userDTO);
  }
  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.userService.update(payload.id, payload.userDTO);
  }

  @MessagePattern(UserMSG.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUseri(@Payload() payload): Promise<any> {
    console.log('PAYLOAD:', payload);
    const user = await this.userService.findOneByEmail(payload.email);
    console.log('USUARIO BASE DE DATOS:',user);
    const isValidPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    );

    console.log('CONTRASEÑA 1: base de datos',user.password);
    console.log('CONTRASEÑA 2: ingresado por el usuario',payload.password);
    console.log('es valido?:',isValidPassword);
    if (user && isValidPassword) {
      console.log('LE RETORNAMOS al usuario validado', user);
      return user;

    } else {
      console.log('NO LE RETORNAMOS USUARIO INVALIDO!')
      return null;
    }
  }
}
