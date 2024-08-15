import { Injectable } from "@nestjs/common";
import { Task } from "src/domain/models/task.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TaskRepository extends Repository<Task>{
    constructor(private dataSource: DataSource){
        super(Task, dataSource.createEntityManager())
    }
}