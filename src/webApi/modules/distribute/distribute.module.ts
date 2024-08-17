import { Module } from '@nestjs/common';
import { DistributeService } from 'src/application/useCases/distribute/distribute.service';
import { DistributeController } from 'src/webApi/controllers/distribute/distribute.controller';
import { UserModule } from '../user/user.module';
import { TasksModule } from '../tasks/tasks.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [DistributeController],
    providers: [DistributeService],
    imports: [UserModule, TasksModule, AuthModule]
})
export class DistributeModule {}
