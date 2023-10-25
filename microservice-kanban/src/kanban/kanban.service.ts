import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IKanban } from 'src/common/interfaces/kanban.interface';
import { KANBAN } from 'src/common/models/models';
import { KanbanDTO } from './dto/kanban.dto';

@Injectable()
export class KanbanService {

  constructor(
    @InjectModel(KANBAN.name)
    private readonly model: Model<IKanban>,
  ) { }

  /*  
     Metodo para crear un kanban.
     entrada: datos del kanban. 
     salida: objeto de nueva kanban.  
  */
  async create(kanbanDTO: KanbanDTO) {
    const newKanban = new this.model(kanbanDTO);
    console.log("Creando kanban ", newKanban);
    return await newKanban.save();
  }

  /*  
     Método para obtener todos los tableros kanban.
     salida: objeto de kanban encontrados. 
  */
  async findAll(): Promise<any> {
    console.log("Visualización de Kanban");
    let params = {
      state: 'en desarrollo'
    }
    return params;
  }

  /*  
     Metodo para actualizar un tablero kanban a partir del id.
     entrada: id del kanban y nuevos datos del kanban. 
     salida: objeto del kanban actualizado.
  */
  async update(id: string, kanbanDTO: KanbanDTO): Promise<IKanban> {
    return await this.model.findByIdAndUpdate(id, kanbanDTO, {
      new: true,
    });
  }
  /*  
    Método para borrar permanentemente un tablero kanban a partir del id.
    entrada: id del kanban.
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
