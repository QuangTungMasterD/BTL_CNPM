import { Test, TestingModule } from '@nestjs/testing';
import { TaikhoansService } from './taikhoans.service';

describe('TaikhoansService', () => {
  let service: TaikhoansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaikhoansService],
    }).compile();

    service = module.get<TaikhoansService>(TaikhoansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
