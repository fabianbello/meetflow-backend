import { Test, TestingModule } from '@nestjs/testing';
import { PostMeetingController } from './post-meeting.controller';

describe('PostMeetingController', () => {
  let controller: PostMeetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostMeetingController],
    }).compile();

    controller = module.get<PostMeetingController>(PostMeetingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
