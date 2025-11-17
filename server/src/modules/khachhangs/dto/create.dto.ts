import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateKhachhangDtoHasTK {
  @IsString()
  @IsNotEmpty()
  Username: string

  @IsString()
  @IsNotEmpty()
  MatKhau: string
  
  @IsString()
  @IsNotEmpty()
  Confirm: string

  @IsNumber({}, { message: 'IdVaiTro phải là số!' })
  @Transform(({ value }) => parseInt(value, 10))
  IdVaiTro: number

  @IsString()
  @IsNotEmpty()
  Ten: string

  @IsString()
  @IsNotEmpty()
  SDT: string;

  @IsString()
  Email: string
}
