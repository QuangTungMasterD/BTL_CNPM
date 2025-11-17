import { Module } from '@nestjs/common';
import { KhuyenmaisService } from './khuyenmais.service';
import { KhuyenmaisController } from './khuyenmais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KhuyenMai } from './entities/khuyenmai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KhuyenMai])],
  controllers: [KhuyenmaisController],
  providers: [KhuyenmaisService],
})
export class KhuyenmaisModule {}
