import { Test, TestingModule } from '@nestjs/testing';
import { HangsService } from './hangs.service';

describe('HangsService', () => {
  let service: HangsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HangsService],
    }).compile();

    service = module.get<HangsService>(HangsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
