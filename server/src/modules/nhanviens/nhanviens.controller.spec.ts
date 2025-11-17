import { Test, TestingModule } from '@nestjs/testing';
import { NhanviensController } from './nhanviens.controller';
import { NhanviensService } from './nhanviens.service';

describe('NhanviensController', () => {
  let controller: NhanviensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NhanviensController],
      providers: [NhanviensService],
    }).compile();

    controller = module.get<NhanviensController>(NhanviensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
