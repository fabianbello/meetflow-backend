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
    const user = await this._clientProxyUser.send(UserMSG.VALID_USER, {username, password})
  }

  async signIn(loginDto: LoginDto){
    const isExist = await this._clientProxyUser.send(UserMSG.VALID_USER, loginDto);
    return await this._clientProxyUser.send(UserMSG.VALID_USER, loginDto);
  }

  async setToken(payload: any){
    const token = await this.jwtService.sign(payload); 
    return await token;
  }

  async esperate(loginDto: LoginDto): Promise<any>{
    return await this._clientProxyUser.send(UserMSG.VALID_USER, loginDto);
    
  }

  esperate2(loginDto: LoginDto){
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
