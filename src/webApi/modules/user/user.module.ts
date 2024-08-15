import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUserService } from 'src/application/useCases/user/iuser.service';
import { UserService } from 'src/application/useCases/user/user.service';
import { User } from 'src/domain/models/user.entity';
import { UserRepository } from 'src/infrastructure/dataAccess/repository/user.repository';
import { UserController } from 'src/webApi/controllers/user/user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserRepository]
})
export class UserModule {}
