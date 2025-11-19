import { Test, TestingModule } from '@nestjs/testing';
import { ChitiethoadonsService } from './chitiethoadons.service';

describe('ChitiethoadonsService', () => {
  let service: ChitiethoadonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChitiethoadonsService],
    }).compile();

    service = module.get<ChitiethoadonsService>(ChitiethoadonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
