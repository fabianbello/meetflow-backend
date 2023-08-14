import { Module } from '@nestjs/common';
import { ElementController } from './element.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [ElementController]
})
export class ElementModule {}
