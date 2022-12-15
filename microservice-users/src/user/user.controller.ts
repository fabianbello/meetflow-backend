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
    console.log('users6:', payload);
    const user = await this.userService.findOneByEmail(payload.email);
    console.log('users7:',user);
    const isValidPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    );

    console.log('CONTRASEÑA 1:',user.password);
    console.log('CONTRASEÑA 2:',payload.password);
    console.log('es valido?:',isValidPassword);
    if (user && isValidPassword) {
      const payload = {
        email: user.email,
        id: user.id,
      };
      const accessToken = await this.jwtService.sign(payload);
      return {accessToken};
    } else {
      return false;
    }
  }
}
