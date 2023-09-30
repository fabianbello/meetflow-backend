import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from './dto/register-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPassword } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UserService {
  logger: any;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(userDTO: UserDTO): Promise<IUser> {
    const { tagName, name, email, password } = userDTO;
    const activationToken = v4();
    const hash = await this.hashPassword(password);


    const userValidate = await this.findByEmail(userDTO.email);
  /*     console.log("USUARIO valido?", userValidate); */
    if(!userValidate){
      const user = this.usersRepository.create({
        name,
        tagName,
        email,
        password: hash,
        activationToken,
        color: 'grey'
      });
   /*    console.log("USUARIO CREADO"); */
      return await this.usersRepository.save(user);
    }else{
 /*      console.log("USUARIO NO SE PUDO CREAR"); */
      return null;
    }

     
  }

  async activateUser(activateUserDto: ActivateUserDto): Promise<void> {
    const { id, code } = activateUserDto;
    const user: User = await this.findOneInactiveByIdAndActivationToken(
      id,
      code,
    );
    if (!user) {
      throw new UnprocessableEntityException('No se pudo procesar');
    }
    user.active = true;
    this.usersRepository.save(user);
  }

  async findOneInactiveByIdAndActivationToken(
    id: string,
    code: string,
  ): Promise<User> {
    return this.usersRepository.findOneBy({
      id: id,
      activationToken: code,
      active: false,
    });
  }

  async requestResetPassword(
    requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    const { email } = requestResetPasswordDto;
    const user: User = await this.findOneByEmail(email);
    user.resetPasswordToken = v4();
    this.usersRepository.save(user);
    // send email
  }

  async resetPassword(resetPasswordDto: ResetPassword): Promise<void> {
    const { resetPasswordToken, password } = resetPasswordDto;
    const user: User = await this.findOneByResetPasswordToken(
      resetPasswordToken,
    );
    /* user.password = await this.encoderService.encodePassword(password); */
    user.resetPasswordToken = null;
    this.usersRepository.save(user);
  }

  async findOneByResetPasswordToken(resetPasswordToken: string): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({
      resetPasswordToken,
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({ email });
    if (!user) {
      null
    }
    return user;
  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async findAll(): Promise<IUser[]> {
    return await this.usersRepository.find();
  }

  async findOne(ide: string): Promise<IUser> {
    return await this.usersRepository.findOneBy({ id: ide });
  }

  async update(ide: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const user = { ...userDTO, password: hash };
    const name = userDTO.name;
    const institution = userDTO.institution;
    const email = userDTO.email;
    const currentProject = userDTO.currentProject;
    const currentMeeting = userDTO.currentMeeting;
    const lastLink = userDTO.lastLink;
    const currentProjectId = userDTO.currentProjectId;
    const currentMeetingId = userDTO.currentMeetingId;
    const color = userDTO.color;
    const tagName = userDTO.tagName;
    
    if(userDTO.password === 'errorcapa9'){
      console.log("SEA A GUARDADO ESTO: ", color)
      return await this.usersRepository.save({id: ide, color});

    }
    if(userDTO.password === 'errorcapa8'){

      console.log("SEA A GUARDADO ESTO: ", name, institution, email, currentProject, currentMeeting,lastLink, currentProjectId, currentMeetingId )
      return await this.usersRepository.save({id: ide, name , institution, email,currentProject, currentMeeting , lastLink, currentProjectId, currentMeetingId});

    }
    else{

        
      console.log("SEA A GUARDADO ESTO: ", name, tagName, institution, email, userDTO.password )
      return await this.usersRepository.save({id: ide, name , tagName, institution, email, password: hash });

    }
    
    
  
  }

  async updateCurrent(ide: string, userDTO: UserDTO): Promise<IUser> {
 /*    const hash = await this.hashPassword(userDTO.password);
    const user = { ...userDTO, password: hash }; */
    const currentProject = userDTO.currentProject;
    const currentMeeting = userDTO.currentMeeting;
    const lastLink = userDTO.lastLink;
    console.log("SEA A GUARDADO ESTO: ", currentProject, currentMeeting, lastLink )
    return await this.usersRepository.save({id: ide, currentProject , currentMeeting, lastLink });
  }

  async delete(id: string) {
    await this.usersRepository.delete(id);
    return { status: HttpStatus.OK, msg: 'deleted' };
  }

  async findByEmail(emaile: string): Promise<IUser> {
    return await this.usersRepository.findOneBy({
      email: emaile,
    });
  }

  async dada(user: UserDTO): Promise<IUser> {
    return user;
  }
}
