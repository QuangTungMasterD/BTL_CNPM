import { Test, TestingModule } from '@nestjs/testing';
import { ThongsokythuatsService } from './thongsokythuats.service';

describe('ThongsokythuatsService', () => {
  let service: ThongsokythuatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThongsokythuatsService],
    }).compile();

    service = module.get<ThongsokythuatsService>(ThongsokythuatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
