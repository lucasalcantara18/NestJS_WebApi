import { Entity, PrimaryColumn, Column } from "typeorm";
import { TaskStatus } from "../enums/taskStatus";

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
}