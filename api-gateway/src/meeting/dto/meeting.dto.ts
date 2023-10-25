import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class MeetingDTO {
    name: string; // nombre de la reunión (reunion n, donde n incremental positivo)
    description: string; // descripción de la reunión
    number: number; // numbero de la reunión
    state: string; // estado de la reunión (new, pre-meeting, in-meeting, post-meeting, finish)
    project: string[]; // id del proyecto asociado
    _id: string; // id
    createdAt: Date; // fecha de creación
    updatedAt: Date; // fecha de actualización
}