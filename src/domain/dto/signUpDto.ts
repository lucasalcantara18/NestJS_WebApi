import { IsNotEmpty } from "class-validator";

export class SignUpDto 
{
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    senha: string;
}