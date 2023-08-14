import { Test, TestingModule } from '@nestjs/testing';
import { PreMeetingController } from './pre-meeting.controller';

describe('PreMeetingController', () => {
  let controller: PreMeetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreMeetingController],
    }).compile();

    controller = module.get<PreMeetingController>(PreMeetingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
