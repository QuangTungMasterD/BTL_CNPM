import { IsNotEmpty, IsString } from "class-validator";

export class CreateLoaiDto {
  @IsNotEmpty()
  @IsString()
  TenLoai: string;
}
