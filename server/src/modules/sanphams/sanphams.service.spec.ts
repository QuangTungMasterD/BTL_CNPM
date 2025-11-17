import { Test, TestingModule } from '@nestjs/testing';
import { SanphamsService } from './sanphams.service';

describe('SanphamsService', () => {
  let service: SanphamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SanphamsService],
    }).compile();

    service = module.get<SanphamsService>(SanphamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
