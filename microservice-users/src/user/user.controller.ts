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
  async create(@Payload() userDTO: UserDTO) {
    console.log('users6516:',userDTO);

    const user = await this.userService.create(userDTO);
   /*  console.log("USUARIO DESDE EL MICROSERVICIO USER CONTROLER:", user); */
    if (user){
     /*  console.log('USUARIO SI SE PUEDE CREAR:',user); */
      return user;
    }else{
    /*   console.log('USUARIO NO SE PUEDE CREAR:',user); */
      return null;
    }
 
  }
  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern('USER_BY_EMAIL')
  findOneByEmail(@Payload() email: string) {
    return this.userService.findOneByEmail(email);
  }


  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: any) {
/*     console.log("PAYLOAD RECIBIDO AQUI: ", payload.id, payload.userDTO) */
    return this.userService.update(payload.id, payload.userDTO);
  }

/*   @MessagePattern(UserMSG.UPDATE_CURRENT)
  updateCurrent(@Payload() payload: any) {
    console.log("PAYLOAD RECIBIDO: ", payload.id, payload.userDTO)
    return this.userService.update(payload.id, payload.userDTO);
  } */

  @MessagePattern(UserMSG.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUseri(@Payload() payload): Promise<any> {
  /*   console.log('PAYLOAD:', payload); */
    const user = await this.userService.findOneByEmail(payload.email);

 /*    console.log('USUARIO BASE DE DATOS:',user); */
    if(user){
      const isValidPassword = await this.userService.checkPassword(
        payload.password,
        user.password,
      );
      if(isValidPassword){
   /*      console.log('LE RETORNAMOS al usuario validado', user); */
        return user;
      }
      else{
     /*    console.log('LAS CONTRASEÑAS NO COINCIDEN') */
        return null;
      }


    }
    else{
 /*      console.log('NO ENCONTRAMOS AL USUARIO') */
      return null;
    }

 
  }
}
