import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/dataAccess/repository/user.repository';
import { IUserService } from './iuser.service';
import { User } from 'src/domain/models/user.entity';
import { ulid } from 'ulid';

@Injectable()
export class UserService implements IUserService {

    readonly _userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }
    async getOneUser(id: string): Promise<User> {
         const user = await this._userRepository.findOneBy({id: id});
        if(user)
            return user;

        throw new NotFoundException("Nao encontrado");
    }
    async insertUser(nome: string, login: string, senha: string): Promise<User> {
        const user: User = {
            id: ulid(),
            nome: nome,
            login: login,
            senha: senha,
            tasks: []
        };

        await this._userRepository.insert(user);

        return user;
    }
}
