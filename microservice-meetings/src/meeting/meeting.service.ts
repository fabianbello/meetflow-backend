import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMeeting } from 'src/common/interfaces/meeting.interface';
import { MEETING } from 'src/common/models/models';
import { MeetingDTO } from './dto/meeting.dto';

@Injectable()
export class MeetingService {

  constructor(
    @InjectModel(MEETING.name)
    private readonly model: Model<IMeeting>,
  ) { }

  /*  
  Método para crear una nueva reunión.
  entrada: datos de la reunión. 
  salida: objeto de nueva reunión.  
  */
  async create(meetingDTO: MeetingDTO): Promise<IMeeting> {
    const newMeeting = new this.model(meetingDTO);
    return await newMeeting.save();
  }

  /*  
  Método para asignar estado a la reunión
  entrada: datos del nuevo estado de la reunion y la id de la reunion a actualizar
  salida: objeto de reuniones actualizadas. 
  */
  async updateState(id: string, statee: any): Promise<IMeeting> {
    const meeting: any = await this.model.findById(id);
    meeting.state = statee.state;
    return await this.model.findByIdAndUpdate(
      id,
      meeting,
      { new: true },
    );
  }

  /*  
  Método para obtener todas las reuniones.
  salida: objeto de reuniones encontradas. 
  */
  async findAll(): Promise<IMeeting[]> {
    return await this.model.find();
  }

  /*  
  Método para  obtener una reunión a partir del id.
  entrada: id de la reunión. 
  salida: objeto de la reunión encontrada.  
  */
  async findOne(id: string): Promise<IMeeting> {
    return await this.model.findById(id);
  }

  /*  
  Método para  obtener runiones a partir del id de un proyecto.
  entrada: el id del proyecto. 
  salida: objeto de las reuniones encontrada para el proyecto.  
  */
  async findByProject(id: string): Promise<IMeeting[]> {
    return await this.model.where({ project: [id] })
  }

  /*  
   Método para actualizar una reunión a partir del id.
   entrada: id de la reunión y nuevos datos de la reunión. 
   salida: objeto de la reunión actualizada.
  */
  async update(id: string, meetingDTO: MeetingDTO): Promise<IMeeting> {
    return await this.model.findByIdAndUpdate(id, meetingDTO, {
      new: true,
    });
  }

  /*  
  Método para borrar permanentemente una reunión a partir del id.
  entrada: id de la reunión.
  salida: valor booleano de confirmación.
  */
  async delete(id: string): Promise<any> {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }

  /*  
  Método para vincular una reunión a un proyecto
  entrada: id del proyecto, id de la reunión
  salida: objeto de la reunión con el proyecto vinculado.
  */
  async setProject(
    meetingId: String,
    projectId: string,
  ): Promise<IMeeting> {
    return await this.model.findByIdAndUpdate(
      meetingId,
      {
        $addToSet: { project: projectId },
      },
      { new: true },
    );
  }

  /*  
  Método para  obtener runiones a partir del id de un proyecto.
  entrada: el id del proyecto. 
  salida: objeto de las reuniones encontrada para el proyecto.  
  */
  async findByProjectNumber(idProject: string, numberMeet): Promise<IMeeting[]> {
    return await this.model.where({ project: [idProject], number: numberMeet })
  }

  /*  
  Metodo para calcular la cantidad de reuniones totales en la plataforma.
  salida: cantidad de reuniones totales
  */
  async countMeetings(): Promise<any> {
    return await this.model.countDocuments().exec();
  }

}
