import { IsNotEmpty } from "class-validator";

export class CreateUserDto 
{
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    senha: string;
}