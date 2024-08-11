import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from '../../../application/useCases/tasks/tasks.service';
import { Task } from 'src/domain/models/task.entity';
import { CreateTaskDto } from 'src/domain/dto/createTasksDto';
import { UpdateTaskDto } from 'src/domain/dto/updateTasksDto';
import { QueryParamsTaskDto } from 'src/domain/dto/queryParamsTasksDto';

@Controller('tasks')
export class TasksController {
    
    readonly _taskService: TasksService;

    constructor(tasksService: TasksService){
        this._taskService = tasksService;
    }

    @Get()
    public async getAllTasks(@Query() params: QueryParamsTaskDto): Promise<Task[]> 
    {
        // if(Object.keys(params).length)
        //     return this._taskService.getTasks(params);
        // else
            return await this._taskService.getAllTasks();

    }

    @Get(':id')
    public getOneTask(@Param('id') id: string): Task 
    {
        return this._taskService.getOneTask(id);
    }

    @Delete(':id')
    public removeTask(@Param('id') id: string): boolean 
    {
        return this._taskService.removeTask(id);
    }
    
    @Post()
    public insertTask(@Body() body: CreateTaskDto): Task
    {
        return this._taskService.insertTask(body.title, body.description);
    }

    @Patch('/:id')
    public updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto): Task
    {
        return this._taskService.updateTask(id, body);
    }
}
