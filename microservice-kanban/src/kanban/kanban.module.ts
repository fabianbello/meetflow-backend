import { Module } from '@nestjs/common';
import { KanbanController } from './kanban.controller';
import { KanbanService } from './kanban.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KANBAN } from 'src/common/models/models';
import { kanbanSchema } from './schema/kanban.schema';

@Module({
  imports: [    MongooseModule.forFeatureAsync([
    {
      name: KANBAN.name,
      useFactory: () => kanbanSchema.plugin(require('mongoose-autopopulate')),
    },
  ])
],
  controllers: [KanbanController],
  providers: [KanbanService]
})
export class KanbanModule {}
