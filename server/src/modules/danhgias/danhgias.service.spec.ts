import { Test, TestingModule } from '@nestjs/testing';
import { DanhgiasService } from './danhgias.service';

describe('DanhgiasService', () => {
  let service: DanhgiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DanhgiasService],
    }).compile();

    service = module.get<DanhgiasService>(DanhgiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
