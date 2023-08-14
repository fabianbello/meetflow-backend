import { Test, TestingModule } from '@nestjs/testing';
import { ElementController } from './element.controller';

describe('ElementController', () => {
  let controller: ElementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElementController],
    }).compile();

    controller = module.get<ElementController>(ElementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
