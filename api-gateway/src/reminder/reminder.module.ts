import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [ProxyModule],
  controllers: [ReminderController],
  providers: [ JwtStrategy]
})
export class ReminderModule {

}
