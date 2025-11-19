import { forwardRef, Module } from '@nestjs/common';
import { SanphamsService } from './sanphams.service';
import { SanphamsController } from './sanphams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sanpham } from './entities/sanpham.entity';
import { ThongsokythuatsModule } from '../thongsokythuats/thongsokythuats.module';
import { KhuyenmaisModule } from '../khuyenmais/khuyenmais.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sanpham]), ThongsokythuatsModule, forwardRef(() => KhuyenmaisModule)],
  controllers: [SanphamsController],
  providers: [SanphamsService],
  exports: [SanphamsService]
})
export class SanphamsModule {}
