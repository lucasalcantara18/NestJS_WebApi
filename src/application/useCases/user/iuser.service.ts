import { User } from "src/domain/models/user.entity"

export interface IUserService{
    getOneUser(id: string): Promise<User>
    insertUser(nome: string, login: string, senha: string): Promise<User>
}