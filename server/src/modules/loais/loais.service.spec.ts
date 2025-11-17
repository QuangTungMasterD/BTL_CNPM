import { Test, TestingModule } from '@nestjs/testing';
import { LoaisService } from './loais.service';

describe('LoaisService', () => {
  let service: LoaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoaisService],
    }).compile();

    service = module.get<LoaisService>(LoaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
