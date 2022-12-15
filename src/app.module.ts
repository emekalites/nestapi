import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilityModule } from './modules/utility/utility.module';
import databaseConfig from './config/database.config';
import { DataSource } from 'typeorm';
import * as path from 'path';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig], isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        ...configService.get<DatabaseConfig>('database'),
        migrationsTableName: 'migrations',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [path.resolve(__dirname + '/../dist/database/migration/*{.ts,.js}')],
        synchronize: false,
        logging: configService.get<string>('MODE') === 'development',
        uuidExtension: 'pgcrypto',
      }),
      dataSourceFactory: async (options) => {
        console.log(options);
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    UtilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
