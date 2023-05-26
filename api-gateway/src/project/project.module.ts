import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [ProxyModule],
  controllers: [ProjectController],
  providers: [ProjectService, JwtStrategy]
})
export class ProjectModule {}
