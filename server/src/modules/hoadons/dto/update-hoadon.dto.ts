import { PartialType } from '@nestjs/mapped-types';
import { CreateHoadonDto } from './create-hoadon.dto';

export class UpdateHoadonDto extends PartialType(CreateHoadonDto) {}
