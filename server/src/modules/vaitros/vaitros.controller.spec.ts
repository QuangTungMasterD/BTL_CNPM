import { Test, TestingModule } from '@nestjs/testing';
import { VaitrosController } from './vaitros.controller';
import { VaitrosService } from './vaitros.service';

describe('VaitrosController', () => {
  let controller: VaitrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaitrosController],
      providers: [VaitrosService],
    }).compile();

    controller = module.get<VaitrosController>(VaitrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
