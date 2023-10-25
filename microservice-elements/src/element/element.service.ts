import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IElement } from 'src/common/interfaces/element.interface';
import { ELEMENT } from 'src/common/models/models';
import { ElementDTO } from './dto/element.dto';

@Injectable()
export class ElementService {

  constructor(
    @InjectModel(ELEMENT.name)
    private readonly model: Model<IElement>,
  ) { }

  /*  
  Método para crear un elemento.
  entrada: datos del elemento. 
  salida: objeto de nuevo elemento.  
  */
  async create(elementDTO: any) {
    const newElement = new this.model(elementDTO);
    return await newElement.save();
  }

  /*  
  Método para obtener todos los elementos.
  salida: objeto de elementos encontrados. 
  */
  async findAll(): Promise<IElement[]> {
    return await this.model.find();
  }

  /*  
  Método para  obtener elementos a partir del id del elemento
  entrada: id del usuario encargado. 
  salida: objeto del elemento encontrada.  
  */
  async findOne(id: string): Promise<IElement> {
    return await this.model.findById(id);
  }

  /*  
  Método para  obtener elementos a partir del id de la reunion.
  entrada: id de la reunion vinculada. 
  salida: objeto del elemento encontrado.  
  */
  async findByMeeting(id: string): Promise<IElement[]> {
    return await this.model.where({ meeting: [id] });
  }

  /*  
   Método para obtener los compromisos a partir del id de la reunión
   entrada: id de la reunión asociado
   salida: objeto del elemento encontrado.  
  */
  async findCompromisesByMeeting(id: string): Promise<IElement[]> {
    return await this.model.where({ meeting: [id], type: 'compromiso' });
  }

  /*  
  Método para  obtener elementos a partir del id del proyecto.
  entrada: id del proyecto vinculado. 
  salida: objeto del elemento encontrado.  
  */
  async findByProject(id: string): Promise<IElement[]> {
    return await this.model.where({ project: [id] })
  }

  /*  
  Método para  obtener elementos a partir del email de usuarios encargados.
  entrada: id del usuario encargado. 
  salida: objeto del elemento encontrada.  
  */
  async findByUser(id: string): Promise<IElement[]> {
    return await this.model.where({ participants: [id] })
  }

  /*  
  Metodo para  obtener un elemento a partir del id del proyecto y email de usuario.
  entrada: id del proyecto vinculado. 
  salida: objeto del elemento encontrado.  
  */
  async findByUserProject(emailUser: string, idProject): Promise<IElement[]> {
    let tasksAux = await this.model.where({ participants: [emailUser], project: idProject, type: 'compromiso' });
    return await this.model.where({ participants: [emailUser], project: idProject, type: 'compromiso' })
  }

  /*  
  Método para  obtener un elemento a partir del id del proyecto, email de usuario y estado del elemento.
  entrada: id del proyecto vinculado. 
  salida: objeto del elemento encontrado.  
  */
  async filterTasks(emailUser: string, idProject: string, state: string): Promise<IElement[]> {
    if (state === 'all') {
      if (emailUser === 'all') {
        return await this.model.where({ project: idProject, type: 'compromiso' })
      } else {
        if (idProject === 'all') {
          return await this.model.where({ participants: [emailUser], type: 'compromiso' })
        } else {
          return await this.model.where({ participants: [emailUser], project: idProject, type: 'compromiso' })
        }
      }
    } else {
      if (emailUser === 'all') {
        return await this.model.where({ project: idProject, type: 'compromiso', state: state })
      } else {
        if (idProject === 'all') {
          return await this.model.where({ participants: [emailUser], type: 'compromiso', state: state })
        } else {
          return await this.model.where({ participants: [emailUser], project: idProject, type: 'compromiso', state: state })
        }
      }
    }
  }

  /*  
   Método para  obtener los elementos en estado no terminado a partir del id del proyecto.
   entrada: id del proyecto vinculado. 
   salida: objeto del elemento encontrado.  
  */
  async findByProjectPreview(id: string): Promise<IElement[]> {
    return await this.model.where({ project: [id], state: ['desarrollo', 'new', 'pausada', 'evaluando'] })
  }

  /*  
  Método para actualizar un elemento a partir del id.
  entrada: id del elemento y nuevos datos del elemento. 
  salida: objeto del elemento actualizada.
  */
  async update(id: string, elementDTO: ElementDTO): Promise<IElement> {
    return await this.model.findByIdAndUpdate(id, elementDTO, {
      new: true,
    });
  }

  /*  
  Método para borrar permanentemente un elemento a partir del id.
  entrada: id del elemento.
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
