import { Module } from '@nestjs/common';
import { HangsService } from './hangs.service';
import { HangsController } from './hangs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hang } from './entities/hang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hang])],
  controllers: [HangsController],
  providers: [HangsService],
})
export class HangsModule {}
