import { User } from "src/domain/models/user.entity";

export interface IDistributeService{
    setUserTask(idUser: string, idTask: string): Promise<boolean>;
    removeUserTask(idUser: string, idTask: string): Promise<boolean>;
    findUserTask(idUser: string): Promise<User>;
}