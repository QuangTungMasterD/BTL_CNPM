
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateSanphamDto {
  @IsNotEmpty()
  Ten: string

  @IsString()
  MoTa: string

  @IsNotEmpty()
  SoLuong:number

  @IsNotEmpty()
  Gia: number

  @IsNumber({})
  BaoHanh: number

  @IsOptional()
  @IsNumber()
  IdLoai?: number;

  @IsOptional()
  @IsNumber() 
  IdHang?: number;
}
