
export class MeetingMinuteDTO {


    readonly title: string;

    readonly place: string;


    readonly startTime: string;


    readonly endTime: string;

    startHour: string;
    endHour: string;

    realStartTime: string;
    realEndTime: string;


 /*    @IsString()
    meeting: string;
 */
    topics: any; 
    participants: any;
    secretaries: any;
    leaders: any;
    assistants: any;
    number: number;
    links: any;

}