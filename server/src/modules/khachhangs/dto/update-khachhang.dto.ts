import { PartialType } from '@nestjs/mapped-types';
import { CreateKhachhangDtoHasTK } from './create.dto';

export class UpdateKhachhangDto extends PartialType(CreateKhachhangDtoHasTK) {
  
}
