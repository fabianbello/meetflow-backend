import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';

@Module({
  imports: [ProxyModule],
  controllers: [GuestController],
  providers: [GuestService]
})
export class GuestModule {}
