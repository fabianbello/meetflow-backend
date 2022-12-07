
import { IsEmail, IsNotEmpty, IsString, IsUUID, Length} from "class-validator"

export class ResetPassword{

    @IsNotEmpty()
    @IsUUID('4')
    resetPasswordToken: string;

    @IsNotEmpty()
    @Length(6,20)
    password: string;

    
}