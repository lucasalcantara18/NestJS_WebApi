import { QueryParamsTaskDto } from "src/domain/dto/queryParamsTasksDto";
import { UpdateTaskDto } from "src/domain/dto/updateTasksDto";
import { Task } from "src/domain/models/task.entity";

export interface ITaskService{
    getAllTasks(): Promise<Task[]>
    getTasks(params: QueryParamsTaskDto): Promise<Task[]>
    getOneTask(id: string): Promise<Task>
    removeTask(id: string): Promise<boolean>
    insertTask(title: string, description: string): Promise<Task>
    updateTask(id: string, body: UpdateTaskDto): Promise<Task>
}