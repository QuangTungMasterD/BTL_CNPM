import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateKhuyenmaiDto {

  @IsNotEmpty()
  @IsNumber()
  IdSanPham: number;

  @IsString()
  TenKM: string;

  @IsNotEmpty()
  @IsNumber()
  MucGiam: number;

  @IsNotEmpty()
  @IsString()
  NgayBD: string;

  @IsNotEmpty()
  @IsString()
  NgayKT: string;
}
