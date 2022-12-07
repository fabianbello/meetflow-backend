import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GuestDTO } from './dto/guest.dto';
import { GuestService } from './guest.service';

@ApiTags('guests')
@Controller('api/guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post()
  create(@Body() guestDTO: GuestDTO) {
    return this.guestService.create(guestDTO);
  }

  @Get()
  findAll(){
    return this.guestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.guestService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() guestDTO: GuestDTO){
    return this.guestService.update(id, guestDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.guestService.delete(id);
  }
  
}
