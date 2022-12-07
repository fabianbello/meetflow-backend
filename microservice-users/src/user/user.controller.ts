import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  create(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Post('/validate')
  async validateUser(@Body() payload: any) {
    const user = await this.userService.findOneByEmail(payload.email);

    const isValidPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    );
    if (user && isValidPassword) {
      return user;
    }
    return null;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDTO: UserDTO) {
    return this.userService.update(id, userDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
