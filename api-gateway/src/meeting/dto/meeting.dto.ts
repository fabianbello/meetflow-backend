import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class MeetingDTO {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly number: number;

}