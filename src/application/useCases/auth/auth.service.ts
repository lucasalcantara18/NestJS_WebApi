import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { IAuthService } from './iauth.service';
import { SignUpDto } from 'src/domain/dto/signUpDto';
import { UserRepository } from 'src/infrastructure/dataAccess/repository/user.repository';
import { ulid } from 'ulid';
import { User } from 'src/domain/models/user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService implements IAuthService {

    readonly _userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    async signIn(login: string, senha: string): Promise<boolean> {
        
        var user = await this._userRepository.findOneBy({login: login});

        if(!user)
            throw new NotFoundException("Incorrect login");

        const isMatch = await bcrypt.compare(senha, user.senha);

        if(!isMatch)
            throw new NotFoundException("Incorrect password");

        return true;
    }

    async SignUp(dto: SignUpDto): Promise<boolean> {
        
        try {

            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash(dto.senha, salt);

            const user: User = {
                id: ulid(),
                nome: dto.nome,
                login: dto.login,
                senha: password,
                tasks: []
            };
    
            await this._userRepository.save(user);
    
            return true;
        } catch (error) {
            if(error.number === 2627)
                throw new UnprocessableEntityException("Already exist a user with the login");
            throw new UnprocessableEntityException("Sign Up fail, try later");
        } 
        
    }

    signOut(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
