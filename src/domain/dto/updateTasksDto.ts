import { IsEnum } from "class-validator";
import { TaskStatus } from "../enums/taskStatus";

export class UpdateTaskDto 
{
    @IsEnum(TaskStatus)
    status: TaskStatus
}