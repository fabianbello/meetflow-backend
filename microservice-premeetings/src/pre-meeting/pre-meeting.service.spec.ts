import { Test, TestingModule } from '@nestjs/testing';
import { PreMeetingService } from './pre-meeting.service';

describe('PreMeetingService', () => {
  let service: PreMeetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreMeetingService],
    }).compile();

    service = module.get<PreMeetingService>(PreMeetingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
