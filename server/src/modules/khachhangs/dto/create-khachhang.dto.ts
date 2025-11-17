import { IsNotEmpty, IsString } from "class-validator";

export class CreateKhachhangDto {
  @IsString()
  @IsNotEmpty()
  Ten: string

  @IsString()
  @IsNotEmpty()
  SDT: string;

  @IsString()
  Email: string
}
