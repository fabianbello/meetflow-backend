import * as mongoose from 'mongoose';

export const elementSchema = new mongoose.Schema(
    {
        description: {type: String, required: true}, // descripción del elemento
        type:  {type: String, required: false },  // compromiso, duda, acuerdo, desacuerdo
        participants:  {type: String, required: false }, // responsables, representantes o encargados
        topic:  {type: Number, required: false }, // numero del tema en que se ha añadido
        meeting: [{type: mongoose.Schema.Types.ObjectId, ref: 'meetings'}], // id de la reunión en la que se añadio el elemento
        project: [{type: mongoose.Schema.Types.ObjectId, ref: 'projects'}], // id del proyecto en el que se añadio el elemento
        meetingMinute: {type: String, required: false }, // id de acta dialogica en que se añadio el elemento
        state: {type: String, required: false }, // new, desarrollo, pausada, evaluando, finalizado, borrada
        number: {type: Number, required: false }, // numero de la reunión en que se añadio el elemento
        dateLimit: {type: String, required: false }, // fecha limite para resolver el compromiso, o fecha en que se creo el acuerdo, duda o desacuerdo
        timeLimit: {type: String, required: false}, // Hora limite para resolver el compromiso, u hora  en que se creo el acuerdo, duda o desacuerdo
        position: {type: String, required: false }, // posicion del elemento dentro del tema en que se añadio
        isSort: {type: String, required: false }, // texto que referencia boolean respecto a si esta ordenado o no respecto a la posición en el tema
    },
    {
        timestamps: true,
    },
);

