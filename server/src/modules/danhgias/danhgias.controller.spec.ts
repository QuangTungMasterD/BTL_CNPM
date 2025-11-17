import { Test, TestingModule } from '@nestjs/testing';
import { DanhgiasController } from './danhgias.controller';
import { DanhgiasService } from './danhgias.service';

describe('DanhgiasController', () => {
  let controller: DanhgiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DanhgiasController],
      providers: [DanhgiasService],
    }).compile();

    controller = module.get<DanhgiasController>(DanhgiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
