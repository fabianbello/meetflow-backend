import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GuestModule } from './guest/guest.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { MeetingModule } from './meeting/meeting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'], // para que todos vean las variablers de entorno ubicadas en .env.developmentc
      isGlobal: true,
    }),
    UserModule,
    GuestModule,
    ProjectModule,
    AuthModule,
    MeetingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
