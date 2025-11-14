import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { BillsModule } from './modules/bills/bills.module';
import { StaffsModule } from './modules/staffs/staffs.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Tung@2005',
      database: 'ql_chmt',
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    ProductsModule, BillsModule, StaffsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
