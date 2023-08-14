import { Test, TestingModule } from '@nestjs/testing';
import { ElementService } from './element.service';

describe('ElementService', () => {
  let service: ElementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElementService],
    }).compile();

    service = module.get<ElementService>(ElementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
