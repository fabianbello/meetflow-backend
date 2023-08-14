import { Test, TestingModule } from '@nestjs/testing';
import { MeetingMinuteService } from './meeting-minute.service';

describe('MeetingMinuteService', () => {
  let service: MeetingMinuteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingMinuteService],
    }).compile();

    service = module.get<MeetingMinuteService>(MeetingMinuteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
