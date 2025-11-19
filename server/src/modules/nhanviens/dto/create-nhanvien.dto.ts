import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNhanvienDto {
  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  Username: string;

  @IsNotEmpty()
  @IsString()
  MatKhau: string;

  @IsNotEmpty()
  @IsString()
  Confirm: string;

  @IsNotEmpty()
  @IsString()
  SDT: string;

  @IsNotEmpty()
  @IsString()
  CCCD: string;

  @IsNotEmpty()
  @IsString()
  Ten: string;

  @IsNotEmpty()
  @IsString()
  ChucVu: string;

  @IsNotEmpty()
  @IsNumber()
  Luong: number

  @IsNotEmpty()
  @IsNumber()
  IdVaiTro: number
}
