
export class MeetingMinuteDTO {
   title: string; // Objetivo del acta
   place: string; // lugar
   startTime: string; // fecha de llamado
   endTime: string; // fecha estimada de termino
   startHour: string; // hora estimada de inicio
   endHour: string; // hora estimada de finalización
   realStartTime: string; // fecha y hora real de inicio de "en-reunión"
   realEndTime: string; // fecha y hora real de término de "en-reunión"
   topics: string[]; // nombres de los temas añadidos al acta
   participants: string[]; // emails de invitados
   assistants: string[]; // emails de invitados que si asistieron
   secretaries: string[]; // emails de secretarios
   leaders: string[]; // emails de anfitriones
   externals: string[]; // emails de usuarios invitados externamente (no miembros del proyecto)
   links: string[]; // enlaces añadidos
   number: number; // numbero de la reunión asociada
   meeting: string; // id de la reunion asociada
   _id: string; // id
   createdAt: Date; // fecha de creación
   updatedAt: Date; // fecha de actualización
}