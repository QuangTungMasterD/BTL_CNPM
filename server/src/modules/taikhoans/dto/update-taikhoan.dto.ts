import { PartialType } from '@nestjs/mapped-types';
import { CreateTaikhoanDto } from './create-taikhoan.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTaikhoanDto extends PartialType(CreateTaikhoanDto) {
  @IsString()
  @IsNotEmpty()
  Username: string;

  @IsString()
  @IsNotEmpty()
  MatKhau: string;

  @IsString()
  Avatar: string;

  @IsNumber({}, { message: 'Vai trò không hợp lệ' })
  @Transform(({ value }) => parseInt(value, 10))
  IdVaiTro: number
}
