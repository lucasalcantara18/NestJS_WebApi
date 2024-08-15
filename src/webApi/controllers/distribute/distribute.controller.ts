import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DistributeService } from 'src/application/useCases/distribute/distribute.service';
import { User } from 'src/domain/models/user.entity';

@Controller('distribute')
export class DistributeController {
    
    readonly _distributedService: DistributeService;
    
    constructor(distributedService: DistributeService){
        this._distributedService = distributedService;
    }

    @Get(':idUser')
    public async getUserTasks(@Param('idUser') idUser: string): Promise<User> 
    {
        return await this._distributedService.findUserTask(idUser);
    }

    @Delete('user/:idUser/task/:idTask/remove')
    public async removeTask(@Param('idUser') idUser: string, @Param('idTask') idTask: string): Promise<boolean> 
    {
        return await this._distributedService.removeUserTask(idUser, idTask);
    }

    @Post('user/:idUser/task/:idTask/add')
    public async insertTask(@Param('idUser') idUser: string, @Param('idTask') idTask: string): Promise<boolean> 
    {
        return await this._distributedService.setUserTask(idUser, idTask);
    }
}
