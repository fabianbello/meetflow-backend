import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KanbanModule } from './kanban/kanban.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [KanbanModule,
     ConfigModule.forRoot({
    envFilePath: ['.env.development'],
    isGlobal: true,
  }),
    MongooseModule.forRoot(process.env.URI_MONGODB)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
