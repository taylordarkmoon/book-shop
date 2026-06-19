import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbEntity } from './data';
// import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './users/user.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
import path, { join } from 'node:path';
import { BookModule } from './books/book.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: dbEntity,
        synchronize: true,
        migrations: ['migrations/*.ts'],
        cli: { migrationsDir: 'migrations' },
      }),
      inject: [ConfigService],
    }),
  //   ServeStaticModule.forRoot({
  //     rootPath: join(__dirname, '..', '..'),
  //    // serveRoot: '/static',
  //  //  serveStaticOptions: { index: false },
  //   }),

  BookModule,
  UserModule,
  AdminModule
 
  ],
})
export class AppModule {}
