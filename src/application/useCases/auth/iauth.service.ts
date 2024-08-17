import { SignUpDto } from "src/domain/dto/signUpDto";

export interface IAuthService{
    signIn(login: string, senha: string): Promise<{ accessToken: string }>;
    SignUp(dto: SignUpDto): Promise<boolean>;
    signOut(): Promise<boolean>;
}