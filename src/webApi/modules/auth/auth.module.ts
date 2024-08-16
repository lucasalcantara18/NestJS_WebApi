import { Module } from '@nestjs/common';
import { AuthService } from 'src/application/useCases/auth/auth.service';
import { AuthController } from 'src/webApi/controllers/auth/auth.controller';
import { UserModule } from '../user/user.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UserModule]
})
export class AuthModule {}
