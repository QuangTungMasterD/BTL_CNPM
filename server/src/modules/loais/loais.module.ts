import { Module } from '@nestjs/common';
import { LoaisService } from './loais.service';
import { LoaisController } from './loais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loai } from './entities/loai.entity';
import { SanphamsModule } from '../sanphams/sanphams.module';

@Module({
  imports: [TypeOrmModule.forFeature([Loai]), SanphamsModule],
  controllers: [LoaisController],
  providers: [LoaisService],
})
export class LoaisModule {}
