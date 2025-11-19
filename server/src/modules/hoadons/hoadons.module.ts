import { Module } from '@nestjs/common';
import { HoadonsService } from './hoadons.service';
import { HoadonsController } from './hoadons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hoadon } from './entities/hoadon.entity';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hoadon]), AuthModule],
  controllers: [HoadonsController],
  providers: [HoadonsService, JwtAuthGuard],
})
export class HoadonsModule {}
