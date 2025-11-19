import { Module } from '@nestjs/common';
import { ChitiethoadonsService } from './chitiethoadons.service';
import { ChitiethoadonsController } from './chitiethoadons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chitiethoadon } from './entities/chitiethoadon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chitiethoadon])],
  controllers: [ChitiethoadonsController],
  providers: [ChitiethoadonsService],
})
export class ChitiethoadonsModule {}
