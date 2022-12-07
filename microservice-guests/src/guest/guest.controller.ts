import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GuestMSG } from 'src/common/constants';
import { GuestDTO } from './dto/guest.dto';
import { GuestService } from './guest.service';


@Controller()
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @MessagePattern(GuestMSG.CREATE)
  create(@Payload() guestDTO: GuestDTO) {
    return this.guestService.create(guestDTO);
  }

  @MessagePattern(GuestMSG.FIND_ALL)
  findAll(){
    return this.guestService.findAll();
  }

  @MessagePattern(GuestMSG.FIND_ONE)
  findOne(@Payload() id: string){
    return this.guestService.findOne(id);
  }

  @MessagePattern(GuestMSG.UPDATE)
  update(@Payload() payload: any){
    return this.guestService.update(payload.id, payload.guestDTO);
  }

  @MessagePattern(GuestMSG.DELETE)
  delete(@Payload() id: string){
    return this.guestService.delete(id);
  }
  
}
