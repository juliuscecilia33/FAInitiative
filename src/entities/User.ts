import { IsEmail, Min } from "class-validator";
import { CreateDateColumn } from "typeorm";
import { UpdateDateColumn } from "typeorm";
import { Index } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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
  @Min(3, { message: "Username must be at least 3 characters long" })
  @Column({ unique: true })
  username: string;

  @Column()
  @Min(6)
  password: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
