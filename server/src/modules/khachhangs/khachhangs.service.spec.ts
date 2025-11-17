import { Test, TestingModule } from '@nestjs/testing';
import { KhachhangsService } from './khachhangs.service';

describe('KhachhangsService', () => {
  let service: KhachhangsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KhachhangsService],
    }).compile();

    service = module.get<KhachhangsService>(KhachhangsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
