import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPreMeeting } from 'src/common/interfaces/pre-meeting.interface';
import { PREMEETING } from 'src/common/models/models';
import { PreMeetingDTO } from './dto/pre-meeting.dto';

@Injectable()
export class PreMeetingService {
  constructor(
    @InjectModel(PREMEETING.name)
    private readonly model: Model<IPreMeeting>,
  ) {}

  /*  
  Método para crear una nueva pre reunión a partir de una reunión.
  entrada: datos de la pre reunión y el id de la reunión. 
  salida: objeto de nueva pre reunión.  
  */
  async create(meetingId: string){
    const params={
      meeting: meetingId,
      meetingMinute: 'acta dialogica'
    };
    const newPreMeeting = new this.model(params);
    return await newPreMeeting.save();
  }

  /*  
  Método para obtener todas las pre reuniones.
  salida: objeto de las pre reuniones encontradas. 
  */
  async findAll(): Promise<IPreMeeting[]> {
    return await this.model.find();
  }

  /*  
  Método para  obtener una pre reunión a partir del id.
  entrada: id de la pre reunión. 
  salida: objeto de la pre reunión encontrada.  
  */
  async findOne(id: string): Promise<IPreMeeting> {
    return await this.model.findById(id);
  }

  /*  
  Metodo para actualizar una pre reunión a partir del id.
  entrada: id de la pre reunión y nuevos datos de la tarea. 
  salida: objeto de la pre reunión actualizada.
  */
  async update(id: string, preMeetingDTO: PreMeetingDTO): Promise<IPreMeeting> {
    return await this.model.findByIdAndUpdate(id, preMeetingDTO, {
      new: true,
    });
  }

  /*  
  Método para borrar permanentemente una pre reunión a partir del id.
  entrada: id de la pre reunión.
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
