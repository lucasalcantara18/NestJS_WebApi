import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParamsTaskDto } from 'src/domain/dto/queryParamsTasksDto';
import { UpdateTaskDto } from 'src/domain/dto/updateTasksDto';
import { TaskStatus } from 'src/domain/enums/taskStatus';
import { Task } from 'src/domain/models/task.entity';
import { TaskRepository } from 'src/infrastructure/dataAccess/repository/task.repository';
import { Like } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];
    readonly _taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository){
        this._taskRepository = taskRepository;
    }

    public async getAllTasks(): Promise<Task[]>
    {
        var result = await this._taskRepository.find();
        return result;
    }

    public async getTasks(params: QueryParamsTaskDto): Promise<Task[]>
    {
        const { status, search } = params;

        const query = this._taskRepository.createQueryBuilder('task');

        if(status)
            query.andWhere('task.status = :status', {status });

        if(search)
            query.andWhere('task.title LIKE :search OR task.description like :search', { search: `%${search}%` });

        const result = await query.getMany();
        return result;
    }

    public async getOneTask(id: string): Promise<Task>
    {
        const task = await this._taskRepository.findOneBy({id: id});
        if(task)
            return task;

        throw new NotFoundException("Nao encontrado");
    }

    public async removeTask(id: string): Promise<boolean>
    {
        const task = await this._taskRepository.findOneBy({id: id});
        if(!task)
            throw new NotFoundException("Nao encontrado");

        //Usando o metodo delete tende a ser mais rapido pois não [e necessario buscar antes]
        await this._taskRepository.remove(task);
        return true;
    }

    public insertTask(title: string, description: string): Task
    {
        const task: Task = {
            description: description,
            title: title,
            id: ulid(),
            status: TaskStatus.OPEN
        };

        this._taskRepository.insert(task);

        return task;
    }

    public async updateTask(id: string, body: UpdateTaskDto): Promise<Task>
    {
        const { status } = body;

        let task = await this._taskRepository.findOneBy({id: id});

        if(!task)
            throw new NotFoundException("Nao encontrado");
        
        task.status = status;

        this._taskRepository.save(task);

        return task;
    }


}
