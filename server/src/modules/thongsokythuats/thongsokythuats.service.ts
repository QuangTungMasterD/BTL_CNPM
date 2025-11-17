import { Injectable } from '@nestjs/common';
import { CreateThongsokythuatDto } from './dto/create-thongsokythuat.dto';
import { UpdateThongsokythuatDto } from './dto/update-thongsokythuat.dto';

@Injectable()
export class ThongsokythuatsService {
  create(createThongsokythuatDto: CreateThongsokythuatDto) {
    return 'This action adds a new thongsokythuat';
  }

  findAll() {
    return `This action returns all thongsokythuats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thongsokythuat`;
  }

  update(id: number, updateThongsokythuatDto: UpdateThongsokythuatDto) {
    return `This action updates a #${id} thongsokythuat`;
  }

  remove(id: number) {
    return `This action removes a #${id} thongsokythuat`;
  }
}
