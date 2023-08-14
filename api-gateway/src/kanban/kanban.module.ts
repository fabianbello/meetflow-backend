import { Module } from '@nestjs/common';
import { KanbanController } from './kanban.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [ProxyModule],
  controllers: [KanbanController],
  providers: [ JwtStrategy]
})
export class KanbanModule {}
