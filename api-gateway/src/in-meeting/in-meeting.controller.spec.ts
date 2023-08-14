import { Test, TestingModule } from '@nestjs/testing';
import { InMeetingController } from './in-meeting.controller';

describe('InMeetingController', () => {
  let controller: InMeetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InMeetingController],
    }).compile();

    controller = module.get<InMeetingController>(InMeetingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
