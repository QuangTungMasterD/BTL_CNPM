import { Module } from '@nestjs/common';
import { LoaisService } from './loais.service';
import { LoaisController } from './loais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loai } from './entities/loai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loai])],
  controllers: [LoaisController],
  providers: [LoaisService],
})
export class LoaisModule {}
