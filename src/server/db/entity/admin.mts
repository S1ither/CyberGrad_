import { Column, Entity, PrimaryGeneratedColumn } from "mikro-orm";

@Entity()
export default class EAdmin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  login!: string;

  @Column()
  password!: string;
}
