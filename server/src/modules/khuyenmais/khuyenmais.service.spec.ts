import { Test, TestingModule } from '@nestjs/testing';
import { KhuyenmaisService } from './khuyenmais.service';

describe('KhuyenmaisService', () => {
  let service: KhuyenmaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KhuyenmaisService],
    }).compile();

    service = module.get<KhuyenmaisService>(KhuyenmaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
