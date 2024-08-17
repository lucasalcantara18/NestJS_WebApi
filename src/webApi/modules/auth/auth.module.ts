import { Module } from '@nestjs/common';
import { AuthService } from 'src/application/useCases/auth/auth.service';
import { AuthController } from 'src/webApi/controllers/auth/auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/application/services/jwt.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'topScretret51',
            signOptions: {
                expiresIn: 3600
            }
        })],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
