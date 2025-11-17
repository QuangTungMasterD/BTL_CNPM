import { Test, TestingModule } from '@nestjs/testing';
import { TaikhoansController } from './taikhoans.controller';
import { TaikhoansService } from './taikhoans.service';

describe('TaikhoansController', () => {
  let controller: TaikhoansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaikhoansController],
      providers: [TaikhoansService],
    }).compile();

    controller = module.get<TaikhoansController>(TaikhoansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
