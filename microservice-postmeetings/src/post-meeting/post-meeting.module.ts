import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { POSTMEETING } from 'src/common/models/models';
import { PostMeetingController } from './post-meeting.controller';
import { PostMeetingService } from './post-meeting.service';
import { PostMeetingSchema } from './schema/post-meeting.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
          {
            name: POSTMEETING.name,
            useFactory: () => PostMeetingSchema.plugin(require('mongoose-autopopulate')),
          },
        ]), 
      ],
      controllers: [PostMeetingController],
      providers: [PostMeetingService],
      exports: [PostMeetingService]
})
export class PostMeetingModule {}
