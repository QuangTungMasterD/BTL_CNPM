import { Test, TestingModule } from '@nestjs/testing';
import { HoadonsController } from './hoadons.controller';
import { HoadonsService } from './hoadons.service';

describe('HoadonsController', () => {
  let controller: HoadonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoadonsController],
      providers: [HoadonsService],
    }).compile();

    controller = module.get<HoadonsController>(HoadonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
