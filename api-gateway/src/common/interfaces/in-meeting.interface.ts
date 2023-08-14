import { IMeetingMinute } from "./meeting-minute.interface";
export interface IInMeeting extends Document{
    name: string;
    description: string;
    meetingMinutes: IMeetingMinute;
}
