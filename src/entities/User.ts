import { IsEmail, Length, Min } from "class-validator";
import { CreateDateColumn } from "typeorm";
import { BeforeInsert } from "typeorm";
import { UpdateDateColumn } from "typeorm";
import { Index } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import bcrypt from "bcrypt";

@Entity("users")
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 255, { message: "Username must be at least 3 characters long" })
  @Column({ unique: true })
  username: string;

  @Column()
  @Length(6, 255)
  password: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
