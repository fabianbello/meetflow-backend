import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IInMeeting } from 'src/common/interfaces/in-meeting.interface';
import { INMEETING } from 'src/common/models/models';
import { InMeetingDTO } from './dto/in-meeting.dto';

@Injectable()
export class InMeetingService {

  constructor(
    @InjectModel(INMEETING.name)
    private readonly model: Model<IInMeeting>,
  ) { }

  /*  
  Método para crear una nueva fase de en reunión.
  entrada: datos de la en reunión. 
  salida: objeto de nueva en reunión.  
  */
  async create(meetingId: string) {
    const params = {
      meeting: meetingId
    };
    const newInMeeting = new this.model(params);
    return await newInMeeting.save();
  }

  /*  
  Metodo para obtener todas las fases de en reuniones.
  salida: objeto de reuniones encotradas. 
  */
  async findAll(): Promise<IInMeeting[]> {
    return await this.model.find();
  }

  /*  
  Metodo para  obtener una en reunión a partir del id.
  entrada: id de la en reunión. 
  salida: objeto de la en reunión encontrada.  
  */
  async findOne(id: string): Promise<IInMeeting> {
    return await this.model.findById(id);
  }

  /*  
  Metodo para actualizar una en reunión a partir del id.
  entrada: id de la en reunión y nuevos datos de la en reunión. 
  salida: objeto de la notificacion actualizada.
  */
  async update(id: string, inMeetingDTO: InMeetingDTO): Promise<IInMeeting> {
    return await this.model.findByIdAndUpdate(id, inMeetingDTO, {
      new: true,
    });
  }

  /*  
  Metodo para borrar permanentemente una en reunión a partir del id.
  entrada: id de la notificacion.
  salida: valor booleano de confirmación.
  */
  async delete(id: string): Promise<any> {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }
}
