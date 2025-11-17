import { Module } from '@nestjs/common';
import { ThongsokythuatsService } from './thongsokythuats.service';
import { ThongsokythuatsController } from './thongsokythuats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thongsokythuat } from './entities/thongsokythuat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Thongsokythuat])],
  controllers: [ThongsokythuatsController],
  providers: [ThongsokythuatsService],
})
export class ThongsokythuatsModule {}
