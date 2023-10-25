import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReminder } from 'src/common/interfaces/reminder.interface';
import { REMINDER } from 'src/common/models/models';
import { ReminderDTO } from './dto/reminder.dto';

@Injectable()
export class ReminderService {

    constructor(
        @InjectModel(REMINDER.name)
        private readonly model: Model<IReminder>,
    ) { }

    /*  
  Método para crear una nueva recordatorio.
  entrada: datos del recordatorio. 
  salida: objeto de nueva recordatorio.  
  */
    async create(reminderDTO: ReminderDTO) {
        const newReminder = new this.model(reminderDTO);
        return await newReminder.save();
    }

    /*  
      Método para  obtener todos los recordatorios
    */
    async findAll(): Promise<IReminder[]> {
        return await this.model.find();
    }

    /*  
    Método para  obtener una recordatorio a partir del id.
    entrada: id del recordatorio. 
    salida: objeto del recordatorio encontrada.  
    */
    async findOne(id: string): Promise<IReminder[]> {
        return await this.model.where({ email: [id] })
    }

    /*  
    Método para actualizar un recordatorio a partir del id.
    entrada: id del recordatorio y nuevos datos del recordatorio. 
    salida: objeto de la recordatorio actualizada.
  */
    async update(id: string, reminderDTO: ReminderDTO): Promise<IReminder> {
        return await this.model.findByIdAndUpdate(id, reminderDTO, {
            new: true,
        });
    }

    /*  
    Metodo para borrar permanentemente el recordatorio a partir del id.
    entrada: id del recodatorio.
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
