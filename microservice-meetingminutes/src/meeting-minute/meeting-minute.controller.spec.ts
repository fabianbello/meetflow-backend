import { Test, TestingModule } from '@nestjs/testing';
import { MeetingMinuteController } from './meeting-minute.controller';

describe('MeetingMinuteController', () => {
  let controller: MeetingMinuteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetingMinuteController],
    }).compile();

    controller = module.get<MeetingMinuteController>(MeetingMinuteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
