
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class ElementDTO{
    description: string; // descripción del elemento
    type: string; // compromiso, duda, acuerdo, desacuerdo
    participants: string[]; // responsables, representantes o encargados
    topic: number; // numero del tema en que se ha añadido
    meeting: string[]; // id de la reunión en la que se añadio el elemento
    project: string[]; // id del proyecto en el que se añadio el elemento
    meetingMinute: string; // id de acta dialogica en que se añadio el elemento
    state: string; // new, desarrollo, pausada, evaluando, finalizado, borrada
    number: number; // numero de la reunión en que se añadio el elemento
    dateLimit: string; // fecha limite para resolver el compromiso, o fecha en que se creo el acuerdo, duda o desacuerdo
    timeLimit: string; // Hora limite para resolver el compromiso, u hora  en que se creo el acuerdo, duda o desacuerdo
    postition: string; // posicion del elemento dentro del tema en que se añadio
    isSort: string; // texto que referencia boolean respecto a si esta ordenado o no respecto a la posición en el tema
    _id: string; // id
    createdAt: Date; // fecha de creación
    updatedAt: Date; // fecha de actualización
}