import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [ProxyModule],
  controllers: [TaskController],
  providers: [ JwtStrategy]
})
export class TaskModule {}
