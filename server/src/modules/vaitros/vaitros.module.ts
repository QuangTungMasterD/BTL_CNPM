import { Module } from '@nestjs/common';
import { VaitrosService } from './vaitros.service';
import { VaitrosController } from './vaitros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaitro } from './entities/vaitro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vaitro])],
  controllers: [VaitrosController],
  providers: [VaitrosService],
})
export class VaitrosModule {}
