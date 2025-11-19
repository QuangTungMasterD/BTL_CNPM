import { Module } from '@nestjs/common';
import { HangsService } from './hangs.service';
import { HangsController } from './hangs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hang } from './entities/hang.entity';
import { SanphamsModule } from '../sanphams/sanphams.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hang]), SanphamsModule],
  controllers: [HangsController],
  providers: [HangsService],
})
export class HangsModule {}
