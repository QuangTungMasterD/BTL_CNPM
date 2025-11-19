import { IsNotEmpty, IsString } from "class-validator";


export class CreateHangDto {
  @IsNotEmpty()
  @IsString()
  TenHang: string;
}
