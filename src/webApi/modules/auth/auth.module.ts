import { Module } from '@nestjs/common';
import { AuthService } from 'src/application/useCases/auth/auth.service';
import { AuthController } from 'src/webApi/controllers/auth/auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/application/services/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        ConfigModule,
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService:ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: 3600
                    }
                };
            },
        })],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
