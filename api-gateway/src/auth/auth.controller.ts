import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserMSG } from 'src/common/constants';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Authentication')
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
        
        await console.log("EXISTE DESDE EL CONTROLADOR", isExist);
        if (isExist){
            const payload = {
                id: isExist.id,
                email: isExist.email    
            }
            const token = await this.jwtService.sign(payload); 
            return {token};
            
        }


    }

    @Post('signup')
    async signUp(@Body() userDTO: UserDTO){

        
        return await this.authService.signUp(userDTO);

    }


}
