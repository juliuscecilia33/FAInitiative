import { CreateDateColumn } from "typeorm";
import { BeforeInsert } from "typeorm";
import { UpdateDateColumn } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";

@Entity()
export class Post extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  toJSON() {
    return classToPlain(this);
  }
}
