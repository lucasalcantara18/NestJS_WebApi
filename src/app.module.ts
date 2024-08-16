import { Module } from '@nestjs/common';
import { TasksModule } from './webApi/modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './webApi/modules/user/user.module';
import { DistributeModule } from './webApi/modules/distribute/distribute.module';
import { AuthModule } from './webApi/modules/auth/auth.module';

@Module({
  imports: [
    TasksModule,
    UserModule,
    DistributeModule,
    AuthModule,
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
    }),
  ]
})
export class AppModule {}
