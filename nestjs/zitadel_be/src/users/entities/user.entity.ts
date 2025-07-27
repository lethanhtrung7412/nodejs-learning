import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ZitadelUser } from '../interface/zitadel-user.interface';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  zitadelId: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  name: string;

  @CreateDateColumn()
  crreatedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  updateFromZitadel(userInfo: ZitadelUser): void {
    this.email = userInfo.email || this.email;
    this.name =
      userInfo.name ||
      userInfo.given_name + ' ' + userInfo.family_name ||
      this.name;
  }
}
