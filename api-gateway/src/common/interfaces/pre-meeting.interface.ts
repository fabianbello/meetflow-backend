import { IMeetingMinute } from "./meeting-minute.interface";

export interface IPreMeeting extends Document{
    name: string;
    description: string;
    meetingMinutes: IMeetingMinute;
}
