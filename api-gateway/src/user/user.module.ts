import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ProxyModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
