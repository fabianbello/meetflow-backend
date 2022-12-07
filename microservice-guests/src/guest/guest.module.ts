import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GUEST } from 'src/common/models/models';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { GuestSchema } from './schema/guest.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: GUEST.name,
        useFactory: () => {
          return GuestSchema;
        },
      },
    ]),
  ],
  controllers: [GuestController],
  providers: [GuestService],
  exports: [GuestService]
})
export class GuestModule {}
