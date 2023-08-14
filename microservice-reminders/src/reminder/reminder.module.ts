import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { REMINDER } from 'src/common/models/models';
import { reminderSchema } from './schema/reminder.schema';
@Module({
  imports: [    MongooseModule.forFeatureAsync([
    {
      name: REMINDER.name,
      useFactory: () => reminderSchema.plugin(require('mongoose-autopopulate')),
    },
  ]),
],
  controllers: [ReminderController],
  providers: [ReminderService]
})
export class ReminderModule {}
