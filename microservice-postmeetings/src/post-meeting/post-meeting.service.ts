import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPostMeeting } from 'src/common/interfaces/post-meeting.interface';
import { POSTMEETING } from 'src/common/models/models';
import { PostMeetingDTO } from './dto/post-meeting.dto';

@Injectable()
export class PostMeetingService {
  constructor(
    @InjectModel(POSTMEETING.name)
    private readonly model: Model<IPostMeeting>,
  ) { }

  /*  
  Metodo para crear una nueva post reunión.
  entrada: datos de la post reunión. 
  salida: objeto de nueva post reunión.  
  */
  async create(meetingId: string) {
    const params = {
      meeting: meetingId,
      meetingMinute: 'acta dialogica'
    };
    const newPostMeeting = new this.model(params);
    return await newPostMeeting.save();
  }

  /*  
  Método para obtener todas las post reuniones.
  salida: objeto de post reuniones encontradas. 
  */
  async findAll(): Promise<IPostMeeting[]> {
    return await this.model.find();
  }

  /*  
  Método para  obtener una post reunión a partir del id.
  entrada: id de la post reunión. 
  salida: objeto de la post reunión encontrada.  
    */
  async findOne(id: string): Promise<IPostMeeting> {
    return await this.model.findById(id);
  }

  /*  
  Método para actualizar una post reunión a partir del id.
  entrada: id de la post reunión y nuevos datos de la post reunión. 
  salida: objeto de la post reunión actualizada.
  */
  async update(id: string, postMeetingDTO: PostMeetingDTO): Promise<IPostMeeting> {
    return await this.model.findByIdAndUpdate(id, postMeetingDTO, {
      new: true,
    });
  }

  /*  
  Método para borrar permanentemente una post reunión a partir del id.
  entrada: id de la post reunión.
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
