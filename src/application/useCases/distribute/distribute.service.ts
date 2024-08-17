import { Injectable, NotFoundException } from '@nestjs/common';
import { IDistributeService } from './idistribute.service';
import { UserRepository } from 'src/infrastructure/dataAccess/repository/user.repository';
import { TaskRepository } from 'src/infrastructure/dataAccess/repository/task.repository';
import { User } from 'src/domain/models/user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class DistributeService implements IDistributeService {
    
    readonly _logger = new Logger("OwnershipService");
    readonly _userRepository: UserRepository;
    readonly _taskRepository: TaskRepository;

    constructor(userRepository: UserRepository, taskRepository: TaskRepository){
        this._taskRepository = taskRepository;
        this._userRepository = userRepository;
    }

    async findUserTask(idUser: string): Promise<User> {
        this._logger.log(`finding tasks from user ${idUser}`);

        const user = await this._userRepository.findOneBy({id: idUser});

        if(!user)
            throw new NotFoundException("Nao encontrado");  

        return user;
    }

    async setUserTask(idUser: string, idTask: string): Promise<boolean> {

        const user = await this._userRepository.findOneBy({id: idUser});
        if(!user)
            throw new NotFoundException("Nao encontrado");

        const task = await this._taskRepository.findOneBy({id: idTask});
        if(!task)
            throw new NotFoundException("Nao encontrado");

        user.tasks.push(task);
        await this._userRepository.save(user);

        return true;        
    }

    async removeUserTask(idUser: string, idTask: string): Promise<boolean> {
        
        const user = await this.findUserTask(idUser);   

        user.tasks = user.tasks.filter(task => task.id !== idTask);

        await this._userRepository.save(user);

        return true;
    }
}
