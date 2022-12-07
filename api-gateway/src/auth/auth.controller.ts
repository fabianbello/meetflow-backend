import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService){
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Body() body){
        return await this.authService.signIn(body);
    }

    @Post('signup')
    async signUp(@Body() userDTO: UserDTO){
        return await this.authService.signUp(userDTO);

    }


}
