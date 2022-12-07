import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [ProxyModule],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
