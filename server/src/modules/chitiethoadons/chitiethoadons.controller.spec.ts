import { Test, TestingModule } from '@nestjs/testing';
import { ChitiethoadonsController } from './chitiethoadons.controller';
import { ChitiethoadonsService } from './chitiethoadons.service';

describe('ChitiethoadonsController', () => {
  let controller: ChitiethoadonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChitiethoadonsController],
      providers: [ChitiethoadonsService],
    }).compile();

    controller = module.get<ChitiethoadonsController>(ChitiethoadonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
