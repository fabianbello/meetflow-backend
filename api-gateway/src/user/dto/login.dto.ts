import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator"

export class LoginDto {
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6,100)
    @IsString()
    password: string;
}