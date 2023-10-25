import * as mongoose from 'mongoose';

export const MeetingMinuteSchema = new mongoose.Schema({
  title: { type: String, required: false }, // Objetivo del acta
  place: { type: String, required: false }, // lugar
  startTime: { type: String, required: false }, // fecha de llamado
  endTime: { type: String, required: false }, // fecha estimada de termino
  endHour: { type: String, required: false },  // hora estimada de finalización
  startHour: { type: String, required: false }, // hora estimada de inicio
  topics: [{type: String}], // nombres de los temas añadidos al acta
  participants: [{type: String}], // emails de invitados
  assistants: [{type: String}], // emails de invitados que si asistieron
  externals: [{type: String}],  // emails de usuarios invitados externamente (no miembros del proyecto)
  secretaries: [{type: String}], // emails de secretarios
  leaders: [{type: String}], // emails de anfitriones
  links: [{type: String}], // enlaces añadidos
  realStartTime: {type: String}, // fecha y hora real de inicio de "en-reunión"
  realEndTime: {type: String}, // fecha y hora real de término de "en-reunión"
  number: { type: Number, required: false }, // numbero de la reunión asociada
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'meetings' }, // id de la reunion asociada
});
MeetingMinuteSchema.index({ id: 1 }, { unique: false });
