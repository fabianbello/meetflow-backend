import { IsNotEmpty, IsString } from "class-validator";

export class PreMeetingDTO{
    meeting: string[]; // id de la reunión asociada
    meetingMinute: string; // id del acta dialogica asociado
    _id: string; // id
    createdAt: Date; // fecha de creación
    updatedAt: Date; // fecha de actualización
}