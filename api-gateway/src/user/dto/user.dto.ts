import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  tagName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  institution: string;

  currentProject: string;

  currentMeeting: string;

  lastLink: string;

  @ApiProperty()
  @Length(6,20)
  @IsString()
  readonly password: string;

  color: string;
}
