export class ProjectDTO {
  
  shortName: string; // Nombre cordo del proyecto
  name: string; // nombre extendido del proyecto
  description: string; // descripción del proyecto
  projectDateI: string; // fecha de inicio del proyecto
  projectDateT: string; // fecha de termino del proyecto
  userOwner: string[]; // emails de usuarios jefes de proyecto
  userMembers: string[]; // emails de usuarios miembros
  _id: string; // id
  createdAt: Date; // fecha de creación
  updatedAt: Date; // fecha de actualización
}
