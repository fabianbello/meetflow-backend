import { Module } from '@nestjs/common';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';
import { MongooseModule } from '@nestjs/mongoose';
import { elementSchema } from './schema/element.schema';
import { ELEMENT } from 'src/common/models/models';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ELEMENT.name,
        useFactory: () => elementSchema.plugin(require('mongoose-autopopulate')),
      },
    ]), 
  ],
  controllers: [ElementController],
  providers: [ElementService]
})
export class ElementModule {}
