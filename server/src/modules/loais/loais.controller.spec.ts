import { Test, TestingModule } from '@nestjs/testing';
import { LoaisController } from './loais.controller';
import { LoaisService } from './loais.service';

describe('LoaisController', () => {
  let controller: LoaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoaisController],
      providers: [LoaisService],
    }).compile();

    controller = module.get<LoaisController>(LoaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
