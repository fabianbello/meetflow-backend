import { Module } from '@nestjs/common';
import { InMeetingController } from './in-meeting.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [InMeetingController]
})
export class InMeetingModule {}
