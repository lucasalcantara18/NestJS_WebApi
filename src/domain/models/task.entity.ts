import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { TaskStatus } from "../enums/taskStatus";
import { User } from "./user.entity";

@Entity()
export class Task {

    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(() => User, (user) => user.tasks, { eager: false })
    user: User;
}