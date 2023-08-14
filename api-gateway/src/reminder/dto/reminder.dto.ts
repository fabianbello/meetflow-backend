import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReminderDTO {

    readonly name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
  
    type: string;
    time: string;
    remeber: string;
    milisec: number;
    
}