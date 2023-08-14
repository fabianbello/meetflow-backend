import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostMeetingModule } from './post-meeting/post-meeting.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [PostMeetingModule,     ConfigModule.forRoot({
    envFilePath: ['.env.development'],
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.URI_MONGODB),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
