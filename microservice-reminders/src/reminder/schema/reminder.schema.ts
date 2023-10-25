import * as mongoose from 'mongoose';

export const reminderSchema = new mongoose.Schema({
    name: {type: String, required: false}, // descripción del recordatorio
    email: {type: String, required: true}, // email del que creo el recordatorio
    oncharge: {type: String, required: false}, // email del que es encargado de la tarea o elemento asociado al recordatorio
    type: { type: String, required: false },  // tipo de recordatorio (task)
    time: { type: String, required: false }, // fecha en que debe ser recordado y enviado el correo electronico
    remember: { type: String, required: false }, // boolean de activar o descativar recordatorio
    milisec: { type: Number, required: false }, // los milisegundos que debe esperar el servidor para enviar el correo electronico
})