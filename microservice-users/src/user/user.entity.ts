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
  @Column({ length: 100 })
  password: string;
  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'uuid', unique: true, name: 'activation_token' })
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
