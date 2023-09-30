import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
    imports: [ProxyModule],
  controllers: [NotificationController]
})
export class NotificationModule {}
