import { Module } from '@nestjs/common';
import { KhachhangsService } from './khachhangs.service';
import { KhachhangsController } from './khachhangs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Khachhang } from './entities/khachhang.entity';
import { TaikhoansModule } from '../taikhoans/taikhoans.module';

@Module({
  imports: [TypeOrmModule.forFeature([Khachhang]), TaikhoansModule],
  controllers: [KhachhangsController],
  providers: [KhachhangsService],
})
export class KhachhangsModule {}
