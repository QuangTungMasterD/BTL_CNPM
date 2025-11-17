import { PartialType } from '@nestjs/mapped-types';
import { CreateThongsokythuatDto } from './create-thongsokythuat.dto';

export class UpdateThongsokythuatDto extends PartialType(CreateThongsokythuatDto) {}
