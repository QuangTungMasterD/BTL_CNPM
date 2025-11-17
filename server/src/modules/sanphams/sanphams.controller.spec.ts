import { Test, TestingModule } from '@nestjs/testing';
import { SanphamsController } from './sanphams.controller';
import { SanphamsService } from './sanphams.service';

describe('SanphamsController', () => {
  let controller: SanphamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SanphamsController],
      providers: [SanphamsService],
    }).compile();

    controller = module.get<SanphamsController>(SanphamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
