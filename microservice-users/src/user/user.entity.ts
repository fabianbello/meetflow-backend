import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid') // incremental id
  id: string;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 100, unique: true })
  email: string;
  @Column({ length: 100, default: 'Sin institución' })
  institution: string;
  @Column({ length: 100})
  password: string;
  @Column({ length: 100,  default: 'white'  })
  color: string;
  @Column({ length: 100,  default: ''  })
  currentProject: string;
  @Column({ length: 100,  default: ''  })
  currentProjectId: string;
  @Column({ length: 100,  default: ''  })
  currentMeeting: string;
  @Column({ length: 100,  default: ''  })
  currentMeetingId: string;
  @Column({ length: 100,  default: ''  })
  lastLink: string;
  @Column({ length: 100,  default: ''  })
  tagName: string;




  @Column({ type: 'boolean', default: false })
  active: boolean;
  @Column({ type: 'uuid', unique: false, name: 'activation_token', default: 'default' })
  activationToken: string;


  @Column({
    type: 'uuid',
    unique: true,
    name: 'reset_password_token',
    nullable: true,
  })
  resetPasswordToken: string;

  @CreateDateColumn({ name: 'create_on' }) // nos pone la fecha en que se creo
  createOn: Date;
}
