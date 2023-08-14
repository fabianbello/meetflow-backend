import { Module } from '@nestjs/common';
import { PreMeetingController } from './pre-meeting.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule] , 
  controllers: [PreMeetingController]
})
export class PreMeetingModule {}
