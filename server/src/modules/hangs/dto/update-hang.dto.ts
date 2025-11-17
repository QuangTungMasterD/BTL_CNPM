import { PartialType } from '@nestjs/mapped-types';
import { CreateHangDto } from './create-hang.dto';

export class UpdateHangDto extends PartialType(CreateHangDto) {}
