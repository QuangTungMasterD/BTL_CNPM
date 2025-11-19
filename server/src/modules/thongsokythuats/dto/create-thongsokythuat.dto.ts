import { IsNotEmpty, IsString } from "class-validator";

export class CreateThongsokythuatDto {
  @IsNotEmpty()
  @IsString()
  TenTS: string;

  @IsNotEmpty()
  @IsString()
  GiaTri: string
}
