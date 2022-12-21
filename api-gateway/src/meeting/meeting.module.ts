import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { MeetingController } from './meeting.controller';

@Module({
  imports: [ProxyModule],
  controllers: [MeetingController],
})
export class MeetingModule {}
