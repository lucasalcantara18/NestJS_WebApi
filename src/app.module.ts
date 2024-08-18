import { Module } from '@nestjs/common';
import { TasksModule } from './webApi/modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './webApi/modules/user/user.module';
import { DistributeModule } from './webApi/modules/distribute/distribute.module';
import { AuthModule } from './webApi/modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TasksModule,
    UserModule,
    DistributeModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mssql',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT'), 10),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          options: {
            trustServerCertificate: true
          },
          autoLoadEntities: true,
          synchronize: true
        };
      },
    }),
  ]
})
export class AppModule {}
