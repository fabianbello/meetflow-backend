import {IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class RegisterUserDTO{
    @IsNotEmpty()
    @IsString()
    readonly name2: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}