import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema(
  {
    shortName: { type: String, required: false },  // Nombre cordo del proyecto
    name: { type: String, required: true }, // nombre extendido del proyecto
    description: { type: String, required: true }, // descripción del proyecto
    projectDateI: { type: String, required: false }, // fecha de inicio del proyecto
    projectDateT: { type: String, required: false }, // fecha de termino del proyecto
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'guests' }], // emails de usuarios invitados
    userOwner: [{type: String}], // emails de usuarios jefes de proyecto
    userMembers: [{type: String}] // emails de usuarios miembros
  },
  { timestamps: true },
);
