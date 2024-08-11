import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryParamsTaskDto } from 'src/domain/dto/queryParamsTasksDto';
import { UpdateTaskDto } from 'src/domain/dto/updateTasksDto';
import { TaskStatus } from 'src/domain/enums/taskStatus';
import { Task } from 'src/domain/models/task.entity';
import { ulid } from 'ulid';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    public getAllTasks(): Task[]
    {
        return this.tasks;
    }

    public getTasks(query: QueryParamsTaskDto): Task[]
    {
        const { status, search } = query

        let tasks = this.tasks;

        if(status)
            tasks = tasks.filter(x => x.status === status);

        if(search)
            tasks = tasks = tasks.filter(x => {
                if(x.title.includes(search) || x.description.includes(search))
                    return true;
                return false;
            });

        return tasks;
    }

    public getOneTask(id: string): Task
    {
        const task = this.tasks.find(x => x.id === id);
        if(task)
            return task;

        throw new NotFoundException("N]ao encontrado");
    }

    public removeTask(id: string): boolean
    {
        if(!this.tasks.some(x => x.id === id))
            return false;
        
        this.tasks = this.tasks.filter(x => x.id !== id);
        return true
    }

    public insertTask(title: string, description: string): Task
    {
        const task: Task = {
            description: description,
            title: title,
            id: ulid(),
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    public updateTask(id: string, body: UpdateTaskDto): Task
    {
        const { status } = body;

        if(!this.tasks.some(x => x.id === id))
            return null;

        const task = this.tasks.find(x => x.id === id);    
        this.tasks = this.tasks.filter(x => x.id !== id);
        
        task.status = status

        this.tasks.push(task);

        return task;
    }


}
