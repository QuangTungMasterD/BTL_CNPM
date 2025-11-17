import { Module } from '@nestjs/common';
import { SanphamsService } from './sanphams.service';
import { SanphamsController } from './sanphams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sanpham } from './entities/sanpham.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sanpham])],
  controllers: [SanphamsController],
  providers: [SanphamsService],
})
export class SanphamsModule {}
