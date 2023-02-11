import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  readonly id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @Column()
  name: string;

  @Column()
  public email: string;

  @Column()
  public admin: boolean;

  @Exclude()
  @Column()
  public password: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

}

export { User };
