import { Module } from '@nestjs/common';
import { TasksController } from '../../controllers/tasks/tasks.controller';
import { TasksService } from '../../../application/useCases/tasks/tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
