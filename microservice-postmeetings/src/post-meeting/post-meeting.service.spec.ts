import { Test, TestingModule } from '@nestjs/testing';
import { PostMeetingService } from './post-meeting.service';

describe('PostMeetingService', () => {
  let service: PostMeetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostMeetingService],
    }).compile();

    service = module.get<PostMeetingService>(PostMeetingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
