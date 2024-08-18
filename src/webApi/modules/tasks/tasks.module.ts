import { Module } from '@nestjs/common';
import { TasksController } from '../../controllers/tasks/tasks.controller';
import { TasksService } from '../../../application/useCases/tasks/tasks.service';
import { TaskRepository } from 'src/infrastructure/dataAccess/repository/task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/domain/models/task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), 
    AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
  exports: [TaskRepository]
})
export class TasksModule {}
