import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class User {

    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column({unique: true})
    login: string;

    @Column()
    senha: string;

    @OneToMany(() => Task, (task) => task.user, { eager: true })
    tasks: Task[]
}