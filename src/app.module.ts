import { Module } from '@nestjs/common';
import { TasksModule } from './webApi/modules/tasks/tasks.module';
import { TasksService } from './application/useCases/tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '2L?EuBz@',
      database: 'tasks_management',
      options: {
        trustServerCertificate: true
      },
      autoLoadEntities: true,
      synchronize: true
    })
  ]
})
export class AppModule {}
