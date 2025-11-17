import { Test, TestingModule } from '@nestjs/testing';
import { ThongsokythuatsController } from './thongsokythuats.controller';
import { ThongsokythuatsService } from './thongsokythuats.service';

describe('ThongsokythuatsController', () => {
  let controller: ThongsokythuatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThongsokythuatsController],
      providers: [ThongsokythuatsService],
    }).compile();

    controller = module.get<ThongsokythuatsController>(ThongsokythuatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
