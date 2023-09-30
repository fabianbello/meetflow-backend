import * as mongoose from 'mongoose';

export const MeetingMinuteSchema = new mongoose.Schema({
  title: { type: String, required: false },
  place: { type: String, required: false },
  startTime: { type: String, required: false },
  endTime: { type: String, required: false },
  endHour: { type: String, required: false },
  startHour: { type: String, required: false },
  /* topics: [
    {
      description: String,
      artifact: [{ specification: String, mode: String, responsible: String }],
    },
  ], */
  topics: [{type: String}],

  /* usuarios */

  // Todos
  participants: [{type: String}], // todos

  // invitados
  assistants: [{type: String}], // Asistentes que si fueron a la reunion
  externals: [{type: String}],  // Los que son miembros del proyecto
 
  // organizadores
  secretaries: [{type: String}],
  leaders: [{type: String}],

  links: [{type: String}],
  realStartTime: {type: String},
  realEndTime: {type: String},
  number: { type: Number, required: false },
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'meetings' },
 /*  meeting: { type: String, required: false }, */
/*   topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'topics' } ], */

});
MeetingMinuteSchema.index({ id: 1 }, { unique: false });
