import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GuestModule } from './guest/guest.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { MeetingModule } from './meeting/meeting.module';
import { PreMeetingModule } from './pre-meeting/pre-meeting.module';
import { InMeetingModule } from './in-meeting/in-meeting.module';
import { PostMeetingModule } from './post-meeting/post-meeting.module';
import { MeetingMinuteModule } from './meeting-minute/meeting-minute.module';
import { ElementModule } from './element/element.module';
import { MailModule } from './mail/mail.module';
import { EventMailModule } from './event-mail/event-mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChatGateway } from './chat/chat.gateway';
import { TaskModule } from './task/task.module';
import { ReminderModule } from './reminder/reminder.module';
import { KanbanModule } from './kanban/kanban.module';
import { NotificationModule } from './notification/notification.module';

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
    PreMeetingModule,
    InMeetingModule,
    PostMeetingModule,
    MeetingMinuteModule,
    ElementModule,
    MailModule,
    EventMailModule,
    EventEmitterModule.forRoot(),
    TaskModule,
    ReminderModule,
    KanbanModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
