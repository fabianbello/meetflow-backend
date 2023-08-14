import { Module } from '@nestjs/common';
import { PostMeetingController } from './post-meeting.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [PostMeetingController]
})
export class PostMeetingModule {}
