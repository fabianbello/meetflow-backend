import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {  PREMEETING } from 'src/common/models/models';
import { PreMeetingController } from './pre-meeting.controller';
import { PreMeetingService } from './pre-meeting.service';
import { PreMeetingSchema } from './schema/pre-meeting.schema';


@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PREMEETING.name,
        useFactory: () => PreMeetingSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
  ],
  controllers: [PreMeetingController],
  providers: [PreMeetingService],
  exports: [PreMeetingService]
})
export class PreMeetingModule {}
