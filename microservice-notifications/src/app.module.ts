import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventMailModule } from './event-mail/event-mail.module';
import { MailModule } from './mail/mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [NotificationModule, EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }), MongooseModule.forRoot(process.env.URI_MONGODB), EventMailModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
