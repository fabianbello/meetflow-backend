import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TASK } from 'src/common/models/models';
import { taskSchema } from './schema/task.schema';

@Module({
  imports: [    MongooseModule.forFeatureAsync([
    {
      name: TASK.name,
      useFactory: () => taskSchema.plugin(require('mongoose-autopopulate')),
    },
  ])
],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
