import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;  // incremental id
  @Column({ length: 100 }) 
  name: string; // nombre del usuario
  @Column({ length: 100, unique: true })
  email: string; // email del usuario
  @Column({ length: 100, default: 'Sin institución' })
  institution: string; // institución del usuario
  @Column({ length: 100})
  password: string; // contraseña del usuario
  @Column({ length: 100,  default: 'white'  })
  color: string; //  color que aparece en las siglas del nombre como perfil
  @Column({ length: 100,  default: ''  })
  currentProject: string; // nombre del último proyecto visitado
  @Column({ length: 100,  default: ''  })
  currentProjectId: string; // id del último proyecto visitado
  @Column({ length: 100,  default: ''  })
  currentMeeting: string; // nombre de la última reunion visitada
  @Column({ length: 100,  default: ''  })
  currentMeetingId: string; // id de la última reunión visistada
  @Column({ length: 100,  default: ''  })
  lastLink: string; // último link visitado dentro de la plataforma
  @Column({ length: 100,  default: ''  })
  tagName: string; // 3 siglas que representan el nombre del usuario
  @Column({ type: 'boolean', default: false })
  active: boolean; // si usuario esta bloqueado o no bloqueado dentro de la plataforma
  @CreateDateColumn({ name: 'create_on' }) 
  createOn: Date; // fecha de creación del usuario
}
