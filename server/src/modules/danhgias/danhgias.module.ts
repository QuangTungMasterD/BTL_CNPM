import { Module } from '@nestjs/common';
import { DanhgiasService } from './danhgias.service';
import { DanhgiasController } from './danhgias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Danhgia } from './entities/danhgia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Danhgia])],
  controllers: [DanhgiasController],
  providers: [DanhgiasService],
})
export class DanhgiasModule {}
