import { Test, TestingModule } from '@nestjs/testing';
import { KhuyenmaisController } from './khuyenmais.controller';
import { KhuyenmaisService } from './khuyenmais.service';

describe('KhuyenmaisController', () => {
  let controller: KhuyenmaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KhuyenmaisController],
      providers: [KhuyenmaisService],
    }).compile();

    controller = module.get<KhuyenmaisController>(KhuyenmaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
