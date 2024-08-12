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
        return await this._taskService.getAllTasks();
    }

    @Get(':id')
    public async getOneTask(@Param('id') id: string): Promise<Task> 
    {
        return await this._taskService.getOneTask(id);
    }

    @Delete(':id')
    public async removeTask(@Param('id') id: string): Promise<boolean> 
    {
        return await this._taskService.removeTask(id);
    }
    
    @Post()
    public async insertTask(@Body() body: CreateTaskDto): Promise<Task>
    {
        return await this._taskService.insertTask(body.title, body.description);
    }

    @Patch('/:id')
    public async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto): Promise<Task>
    {
        return await this._taskService.updateTask(id, body);
    }
}
