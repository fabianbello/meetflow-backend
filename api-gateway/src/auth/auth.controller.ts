import { Body, Controller, Get, Post, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserMSG } from 'src/common/constants';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Autentificación (auth)')
@Controller('api/auth')
export class AuthController {
    

    constructor(private readonly jwtService: JwtService, private readonly clientProxy: ClientProxyMeetflow, private readonly authService: AuthService){
    }

    private _clientProxyUser  = this.clientProxy.clientProxyUser();

  /*   @UseGuards(LocalAuthGuard) */
    @Post('signin')
    async signIn(@Body() loginDto: LoginDto){

        /* const { email, password} = loginDto; */
        /* const user = await this._clientProxyUser.send(UserMSG.VALID_USER, loginDto);
         */
        /* const user:any = await this.authService.esperate3(loginDto);
        await console.log(user);  */
        const isExist = await this._clientProxyUser.send(UserMSG.VALID_USER, loginDto).toPromise();
        
     /*    await console.log("EXISTE DESDE EL CONTROLADOR", isExist); */
        if (isExist){
            const payload = {
                id: isExist.id,
                email: isExist.email    
            }
            const token = await this.jwtService.sign(payload); 
            return {token};
            
        }
        else{

            throw new UnprocessableEntityException('No existe el usuario especificado o la contraseña es incorrecta.');
        }


    }

    @Post('signup')
    async signUp(@Body() userDTO: UserDTO){

        
        const isExist = await this._clientProxyUser.send(UserMSG.CREATE, userDTO).toPromise();
      /*   console.log("EXISTE ESTE WN?", isExist); */

        if (isExist){

            return {isExist};
            
        }
        else{
            throw new UnprocessableEntityException('ya existe un usuario con ese correo electronico.');
        }

    }




}
