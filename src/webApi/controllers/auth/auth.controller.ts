import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/application/useCases/auth/auth.service';
import { SignInDto } from 'src/domain/dto/signInDto';
import { SignUpDto } from 'src/domain/dto/signUpDto';

@Controller('auth')
export class AuthController {

    readonly _authService: AuthService;

    constructor(authService: AuthService){
        this._authService = authService;
    }

    @Post('/signUp')
    public async signUp(@Body() body: SignUpDto): Promise<boolean>
    {
        return await this._authService.SignUp(body);
    }

    @Post('/signIn')
    public async signIn(@Body() body: SignInDto): Promise<{ accessToken: string }>
    {
        return await this._authService.signIn(body.login, body.senha);
    }

    @Post('/signOut')
    public async signOut(): Promise<boolean>
    {
        return await this._authService.signOut();
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    public test(@Req() req){
        console.log(req);
    }

}
