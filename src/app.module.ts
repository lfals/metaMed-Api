import { UserController } from './models/users/users.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcronymsModule } from './models/acronyms/acronyms.module';
import { AcronymsController } from './models/acronyms/acronyms.controller';
import { ManeuverModule } from './models/maneuvers/maneuvers.module';
import { ManeuversController } from './models/maneuvers/maneuvers.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_URL,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB,
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    AcronymsModule,
    ManeuverModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    AcronymsController,
    ManeuversController,
  ],
  providers: [AppService],
})
export class AppModule {}
