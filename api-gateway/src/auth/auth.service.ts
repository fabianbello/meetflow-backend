import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from 'src/common/constants';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxyMeetflow,
    private readonly jwtService: JwtService,
  ) {}

  private _clientProxyUser  = this.clientProxy.clientProxyUser();

  async validateUser(username: string, password: string): Promise<any> {
   /*  console.log('users4:',username); */
    const user = await this._clientProxyUser.send(UserMSG.VALID_USER, {username, password})
  /*   console.log('users5:',user); */
    /* if (user) {
      return user;
    } else {
      return false;
    } */
  }

  async signIn(loginDto: LoginDto){
    /* const payload = {
      email: user.email,
      id: user.id,
    };
    
    
    const accessToken = await this.jwtService.sign(payload); */
    /* this.esperate2(loginDto).then((resp) => console.log(resp)); */
    
    /* const user = await this.esperate3(loginDto);

    console.log(user); */

    const isExist = await this._clientProxyUser.send(UserMSG.VALID_USER, loginDto);

    return await this._clientProxyUser.send(UserMSG.VALID_USER, loginDto);

   
    



/*     if(isExist){
      const passwords = {
        passLogin: loginDto.password,
        passDataBase: isExist.password

      }
      const isPass = await this._clientProxyUser.send(UserMSG.VALID_PASS, isExist);

      const payload = {
        email: loginDto.email
      }
      const token = await this.jwtService.sign(payload); 
      return token;
    }

    return this._clientProxyUser.send(UserMSG.VALID_USER, loginDto);
    
     */
  }

  async setToken(payload: any){
    const token = await this.jwtService.sign(payload); 
   /*  console.log("SE PONE TOKEN", token); */
    return await token;
  }

  async esperate(loginDto: LoginDto): Promise<any>{
   /*  console.log('login',loginDto); */
    return await this._clientProxyUser.send(UserMSG.VALID_USER, loginDto);
    
  }

  esperate2(loginDto: LoginDto){
   /*  console.log('login',loginDto); */
  
    return new Promise((resolve, reject) => {
      resolve(this._clientProxyUser.send(UserMSG.VALID_USER, loginDto));
    })
  }

  esperate3(loginDto: LoginDto){
    return this._clientProxyUser.send(UserMSG.VALID_USER, loginDto);
  }


  async signUp(userDTO: UserDTO) {
    return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
  }
}
