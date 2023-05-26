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
    const { name, email, password } = userDTO;
    const activationToken = v4();
    const hash = await this.hashPassword(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hash,
      activationToken,
    });
    return await this.usersRepository.save(user);
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
      throw new NotFoundException(`user with email ${email} no found`);
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
    return await this.usersRepository.save(user);
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

  async dada(user: UserDTO): Promise<IUser>{
    return user;

  }
}
