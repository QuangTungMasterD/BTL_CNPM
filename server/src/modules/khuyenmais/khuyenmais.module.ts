import { forwardRef, Module } from '@nestjs/common';
import { KhuyenmaisService } from './khuyenmais.service';
import { KhuyenmaisController } from './khuyenmais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KhuyenMai } from './entities/khuyenmai.entity';
import { SanphamsModule } from '../sanphams/sanphams.module';

@Module({
  imports: [TypeOrmModule.forFeature([KhuyenMai]), forwardRef(() => SanphamsModule)],
  controllers: [KhuyenmaisController],
  providers: [KhuyenmaisService],
  exports: [KhuyenmaisService]
})
export class KhuyenmaisModule {}
