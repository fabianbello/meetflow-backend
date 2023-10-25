export class ReminderDTO {
    name: string; // descripción del recordatorio
    email: string; // email del que creo el recordatorio
    oncharge: string; // email del que es encargado de la tarea o elemento asociado al recordatorio
    type: string; // tipo de recordatorio (task)
    time: string; // fecha en que debe ser recordado y enviado el correo electronico
    remember: string; // boolean de activar o descativar recordatorio
    milisec: number; // los milisegundos que debe esperar el servidor para enviar el correo electronico
    _id: string; // id
    createdAt: Date; // fecha de creación
    updatedAt: Date; // fecha de actualización
}