import { Module } from '@nestjs/common';
import { InMeetingController } from './in-meeting.controller';
import { InMeetingService } from './in-meeting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { INMEETING } from 'src/common/models/models';
import { InMeetingSchema } from './schema/in-meeting.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: INMEETING.name,
        useFactory: () => InMeetingSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
  ],
  controllers: [InMeetingController],
  providers: [InMeetingService],
  exports: [InMeetingService]
})
export class InMeetingModule {}
