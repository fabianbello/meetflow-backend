import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyArray, Model } from 'mongoose';
import { IMeetingMinute } from 'src/common/interfaces/meeting-minute.interface';
import { MEETINGMINUTE } from 'src/common/models/models';
import { MeetingMinuteDTO } from './dto/meeting-minute.dto';

@Injectable()
export class MeetingMinuteService {

  constructor(
    @InjectModel(MEETINGMINUTE.name)
    private readonly model: Model<IMeetingMinute>
  ) { }

  /*  
     Método para crear una nueva acta dialógica.
     entrada: datos del acta dialógica. 
     salida: objeto de nueva acta dialógica.  
  */
  async create(meetingMinuteDTO: MeetingMinuteDTO, user: any): Promise<IMeetingMinute> {
    const newMeetingMinute = new this.model(meetingMinuteDTO);
    return await newMeetingMinute.save();
  }

  /*  
    Método para obtener todas las actas dialógicas.
    salida: objeto de actas dialógicas encontradas. 
  */
  async findAll(): Promise<IMeetingMinute[]> {
    return await this.model.find();
  }

  /*  
   Método para  obtener una acta dialógica a partir del id.
  entrada: id de la acta dialógica. 
   salida: objeto de la acta dialógica encontrada.  
  */
  async findOne(id: string): Promise<any> {
    const meetingMinute = await this.model.find({ meeting: id });
    return meetingMinute;
  }

  /*  
      Método para actualizar una acta dialógica a partir del id.
      entrada: id de la acta dialógica y nuevos datos de la acta dialógica. 
      salida: objeto de la acta dialógica actualizada.
  */
  async update(
    id: string,
    meetingMinuteDTO: MeetingMinuteDTO,
  ): Promise<IMeetingMinute> {
    return await this.model.findByIdAndUpdate(id, meetingMinuteDTO, {
      new: true,
    });
  }

  /*  
    Método para borrar permanentemente una acta dialógica a partir del id.
    entrada: id de la acta dialógica.
    salida: valor booleano de confirmación.
  */
  async delete(id: string): Promise<any> {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted'
    }
  }

}
