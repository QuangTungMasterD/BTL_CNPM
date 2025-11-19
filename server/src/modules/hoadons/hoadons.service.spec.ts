import { Test, TestingModule } from '@nestjs/testing';
import { HoadonsService } from './hoadons.service';

describe('HoadonsService', () => {
  let service: HoadonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoadonsService],
    }).compile();

    service = module.get<HoadonsService>(HoadonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
