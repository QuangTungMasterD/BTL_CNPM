import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';


export class CreateTaikhoanDto {
  

  @IsString()
  @IsNotEmpty()
  Username: string;

  @IsString()
  @IsNotEmpty()
  MatKhau: string;

  @IsNumber({}, { message: 'IdVaiTro phải là số!' })
  @Transform(({ value }) => parseInt(value, 10))
  IdVaiTro: number
}
