import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from 'src/common/constants';
import { ClientProxyMeetflow } from 'src/common/proxy/client.proxy';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxyMeetflow,
    private readonly jwtService: JwtService,
  ) {}

  private _clientProxyUser  = this.clientProxy.clientProxyUser();

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this._clientProxyUser.send(UserMSG.VALID_USER, {email, password})
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async signIn(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async signUp(userDTO: UserDTO) {
    return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
  }
}
