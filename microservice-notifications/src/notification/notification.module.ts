import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { notificationSchema } from './schema/notification.schema';
import { NOTIFICATION } from 'src/common/models/models';

@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: NOTIFICATION.name,
      useFactory: () => notificationSchema,
    },
  ]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule { }
