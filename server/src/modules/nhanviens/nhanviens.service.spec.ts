import { Test, TestingModule } from '@nestjs/testing';
import { NhanviensService } from './nhanviens.service';

describe('NhanviensService', () => {
  let service: NhanviensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NhanviensService],
    }).compile();

    service = module.get<NhanviensService>(NhanviensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
