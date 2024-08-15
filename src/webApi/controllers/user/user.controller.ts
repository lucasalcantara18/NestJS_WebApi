import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from 'src/application/useCases/user/user.service';
import { CreateUserDto } from 'src/domain/dto/createUserDto';
import { User } from 'src/domain/models/user.entity';

@Controller('users')
export class UserController {
    
    readonly _userService: UserService;

    constructor(tasksService: UserService){
        this._userService = tasksService;
    }

    @Get(':id')
    public async getOneUser(@Param('id') id: string): Promise<User> 
    {
        return await this._userService.getOneUser(id);
    }

    @Post()
    public async insertUser(@Body() body: CreateUserDto): Promise<User>
    {
        return await this._userService.insertUser(body.nome, body.login, body.senha);
    }
}