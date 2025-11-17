import { Test, TestingModule } from '@nestjs/testing';
import { HangsController } from './hangs.controller';
import { HangsService } from './hangs.service';

describe('HangsController', () => {
  let controller: HangsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HangsController],
      providers: [HangsService],
    }).compile();

    controller = module.get<HangsController>(HangsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
