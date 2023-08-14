import { Test, TestingModule } from '@nestjs/testing';
import { InMeetingService } from './in-meeting.service';

describe('InMeetingService', () => {
  let service: InMeetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMeetingService],
    }).compile();

    service = module.get<InMeetingService>(InMeetingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
