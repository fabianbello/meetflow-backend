/* import { Repository } from 'typeorm'
import { RegisterUserDTO } from './dto/register-user.dto';
import { User } from './user.entity';

export class UsersRepository extends Repository<User>{

    async createUser(registerUserDto: RegisterUserDTO): Promise<void> {
        const {name, email, password} = registerUserDto; //extraemos del registerUserDto los datos a buscar

        const user = this.create({name, email, password}); // crea en la tabla user con los datos
        await this.save(user); // guarda
    }
} */