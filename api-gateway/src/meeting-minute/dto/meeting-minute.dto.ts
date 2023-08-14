
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class MeetingMinuteDTO{
    @IsString()
    readonly title: string;

    @IsString()
    readonly place: string;

   startTime: Date;

    endTime: Date;

    endHour: string;
    startHour: string;


 /*    @IsString()
    meeting: string;
 */
    topics: any; 
    leaders: any;
    participants: any;
    secretaries: any;
    assistants: any;
    number: number;
    links: any;
    realStartTime: string;
    realEndTime: string;
    
}