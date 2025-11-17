import { Test, TestingModule } from '@nestjs/testing';
import { KhachhangsController } from './khachhangs.controller';
import { KhachhangsService } from './khachhangs.service';

describe('KhachhangsController', () => {
  let controller: KhachhangsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KhachhangsController],
      providers: [KhachhangsService],
    }).compile();

    controller = module.get<KhachhangsController>(KhachhangsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
