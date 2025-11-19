import { PartialType } from '@nestjs/mapped-types';
import { CreateChitiethoadonDto } from './create-chitiethoadon.dto';

export class UpdateChitiethoadonDto extends PartialType(CreateChitiethoadonDto) {}
