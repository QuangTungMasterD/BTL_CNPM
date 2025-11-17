import { PartialType } from '@nestjs/mapped-types';
import { CreateLoaiDto } from './create-loai.dto';

export class UpdateLoaiDto extends PartialType(CreateLoaiDto) {}
