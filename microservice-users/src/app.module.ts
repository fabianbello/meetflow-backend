import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({

      type: 'mysql',
      // PRODUCCION
      /* host: "hostdbusers",
        port: 3306, */
      // LOCAL
      /* host: 'localhost',
      port: 5000, */
      host: process.env.HOST_DB_USER,
      port: parseInt(process.env.PORT_DB_USER),
      username: process.env.USERNAME_DB_USER,
      password: process.env.PASSWORD_DB_USER,
      database: process.env.DATABASE_DB_USER,
      entities: [User],
      synchronize: true, // se actualiza automaticamente (no poner en produción)
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
