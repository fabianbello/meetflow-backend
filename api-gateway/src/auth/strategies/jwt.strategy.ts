import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
  /*           usernameField: "email"  */
        });
        
    }
    async validate(payload: any){
       /*  console.log("Lo que hay en el token: ", payload); */
        return await {id: payload.id, email: payload.email}
    }
}
