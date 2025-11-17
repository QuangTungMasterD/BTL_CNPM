import { Test, TestingModule } from '@nestjs/testing';
import { VaitrosService } from './vaitros.service';

describe('VaitrosService', () => {
  let service: VaitrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaitrosService],
    }).compile();

    service = module.get<VaitrosService>(VaitrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
