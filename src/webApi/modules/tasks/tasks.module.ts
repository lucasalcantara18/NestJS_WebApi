import { Module } from '@nestjs/common';
import { TasksController } from '../../controllers/tasks/tasks.controller';
import { TasksService } from '../../../application/useCases/tasks/tasks.service';
import { TaskRepository } from 'src/infrastructure/dataAccess/repository/task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/domain/models/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
