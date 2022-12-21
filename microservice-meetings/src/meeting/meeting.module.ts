import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MEETING, PROJECT } from 'src/common/models/models';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingSchema } from './schema/meeting.schema';
import { ProjectSchema } from './schema/project.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: MEETING.name,
        useFactory: () => MeetingSchema.plugin(require('mongoose-autopopulate')),
      },
      {
        name: PROJECT.name,
        useFactory: () => ProjectSchema,
      }
    ]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService]
})
export class MeetingModule {}
