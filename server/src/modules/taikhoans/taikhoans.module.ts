import { Module } from '@nestjs/common';
import { TaikhoansService } from './taikhoans.service';
import { TaikhoansController } from './taikhoans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taikhoan } from './entities/taikhoan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taikhoan])],
  controllers: [TaikhoansController],
  providers: [TaikhoansService],
  exports: [TaikhoansService]
})
export class TaikhoansModule {}
