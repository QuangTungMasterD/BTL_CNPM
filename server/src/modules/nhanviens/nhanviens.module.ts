import { Module } from '@nestjs/common';
import { NhanviensService } from './nhanviens.service';
import { NhanviensController } from './nhanviens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nhanvien } from './entities/nhanvien.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nhanvien])],
  controllers: [NhanviensController],
  providers: [NhanviensService],
  exports: [NhanviensService]
})
export class NhanviensModule {}
