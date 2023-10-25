import {
  HttpStatus,
  Injectable,

} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  logger: any;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  /*  
   Método para generar una nueva contraseña encriptada
  */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /*  
   Método para crear un nuevo usuario.
   entrada: datos del usuario. 
   salida: objeto del nuevo usuario.  
  */
  async create(userDTO: UserDTO): Promise<IUser> {
    const { tagName, name, email, password } = userDTO;
    const activationToken = v4();
    const hash = await this.hashPassword(password);
    const userValidate = await this.findByEmail(userDTO.email);
    if (!userValidate) {
      const user = this.usersRepository.create({
        name,
        tagName,
        email,
        password: hash,
        color: 'grey'
      });
      return await this.usersRepository.save(user);
    } else {
      return null;
    }
  }

  /*  
    Método para resetear la contraseña a una nueva y enviarla por correo electronico
    entrada: email del usuario que solicita restablecer contraseña
    salida: usuario con contraseña nueva generada aleatoriamente
  */
  async requestResetPassword(
    emailUser: string,
  ): Promise<any> {
    let user: User = await this.findOneByEmail(emailUser);
    const password = v4();
    const hash = await this.hashPassword(password);
    user.password = hash;
    await this.usersRepository.save(user);
    user.password = password;
    return user;
  }

  /*  
  Método para  obtener un usuario a partir del email.
  entrada: email del usuario. 
  salida: objeto del usuario encontrado.  
  */
  async findOneByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({ email });
    if (!user) {
      null
    }
    return user;
  }

  // validar contraseña ingresada vs la encontrada en base de datos
  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  /*  
  Método para obtener todos los usuarios registrados.
  salida: llista con todos los usuarios registrados.  
  */
  async findAll(): Promise<IUser[]> {
    return await this.usersRepository.find();
  }

  /*  
  Método para obtener un usuario a partir del id.
  entrada: id del usuario. 
  salida: objeto del usuario encontrado.  
  */
  async findOne(ide: string): Promise<IUser> {
    return await this.usersRepository.findOneBy({ id: ide });
  }


  /*  
Método para actualizar un usuario a partir del id.
entrada: id del usuario y nuevos datos del usuario. 
salida: objeto del usuario actualizada.
*/
  async update(ide: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const name = userDTO.name;
    const institution = userDTO.institution;
    const email = userDTO.email;
    const tagName = userDTO.tagName;
    return await this.usersRepository.save({ id: ide, name, tagName, institution, email, password: hash });
  }

  /*  
  Método para actualizar el color de un usuario
  entrada: usuario y su color
  salida: usuario con color actualizado
  */
  async updateColor(ide: string, userDTO: UserDTO): Promise<IUser> {
    const color = userDTO.color;
    return await this.usersRepository.save({ id: ide, color });
  }

  /*  
    Método para actualizar la última sección que visito el usuario
    entrada: usuario y los datos de su ultima sección
    salida: usuario con su última sección visitada actualizada
  */
  async updateCurrentSection(ide: string, userDTO: UserDTO): Promise<IUser> {
    const name = userDTO.name;
    const institution = userDTO.institution;
    const email = userDTO.email;
    const currentProject = userDTO.currentProject;
    const currentMeeting = userDTO.currentMeeting;
    const lastLink = userDTO.lastLink;
    const currentProjectId = userDTO.currentProjectId;
    const currentMeetingId = userDTO.currentMeetingId;
    return await this.usersRepository.save({ id: ide, name, institution, email, currentProject, currentMeeting, lastLink, currentProjectId, currentMeetingId });
  }

  /*  
  Método para borrar permanentemente un usuario a partir del id.
  entrada: id del usuario.
  salida: valor booleano de confirmación.
  */
  async delete(id: string) {
    await this.usersRepository.delete(id);
    return { status: HttpStatus.OK, msg: 'deleted' };
  }

  /*  
  Método para calcular la cantidad de usuarios totales en la plataforma
  salida: cantidad de usuarios
   */
  async countUsers(): Promise<any> {
    return await this.usersRepository.count();
  }

  /*  
  Método para buscar un usuario por email
   */
  async findByEmail(emaile: string): Promise<IUser> {
    return await this.usersRepository.findOneBy({
      email: emaile,
    });
  }

}
