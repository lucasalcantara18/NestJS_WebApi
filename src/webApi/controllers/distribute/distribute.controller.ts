import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/application/decorators/get-user.decorator';
import { DistributeService } from 'src/application/useCases/distribute/distribute.service';
import { User } from 'src/domain/models/user.entity';

@Controller('distribute')
@UseGuards(AuthGuard())
export class DistributeController {
    
    readonly _distributedService: DistributeService;
    
    constructor(distributedService: DistributeService){
        this._distributedService = distributedService;
    }

    @Get()
    public async getUserTasks(@GetUser() user: User): Promise<User> 
    {
        return await this._distributedService.findUserTask(user.id);
    }

    @Delete('/task/:idTask/remove')
    public async removeTask(@GetUser() user: User, @Param('idTask') idTask: string): Promise<boolean> 
    {
        return await this._distributedService.removeUserTask(user.id, idTask);
    }

    @Post('/task/:idTask/add')
    public async insertTask(@GetUser() user: User, @Param('idTask') idTask: string): Promise<boolean> 
    {
        return await this._distributedService.setUserTask(user.id, idTask);
    }
}
