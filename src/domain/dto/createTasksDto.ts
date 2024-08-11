import { IsNotEmpty } from "class-validator";
import { TaskStatus } from "../enums/taskStatus";

export class CreateTaskDto 
{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}