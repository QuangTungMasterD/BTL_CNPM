import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KhachhangsModule } from './modules/khachhangs/khachhangs.module';
import { NhanviensModule } from './modules/nhanviens/nhanviens.module';
import { TaikhoansModule } from './modules/taikhoans/taikhoans.module';
import { VaitrosModule } from './modules/vaitros/vaitros.module';
import { ConfigModule } from '@nestjs/config';
import { SanphamsModule } from './modules/sanphams/sanphams.module';
import { DanhgiasModule } from './modules/danhgias/danhgias.module';
import { ThongsokythuatsModule } from './modules/thongsokythuats/thongsokythuats.module';
import { KhuyenmaisModule } from './modules/khuyenmais/khuyenmais.module';
import { LoaisModule } from './modules/loais/loais.module';
import { HangsModule } from './modules/hangs/hangs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST_DB,
      port: 3306,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      entities: [],
      synchronize: false,
      autoLoadEntities: true
    }),
      KhachhangsModule,
      NhanviensModule,
      TaikhoansModule,
      VaitrosModule,
      SanphamsModule,
      DanhgiasModule,
      ThongsokythuatsModule,
      KhuyenmaisModule,
      LoaisModule,
      HangsModule,
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
