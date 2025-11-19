import { Injectable } from '@nestjs/common';
import { CreateChitiethoadonDto } from './dto/create-chitiethoadon.dto';
import { UpdateChitiethoadonDto } from './dto/update-chitiethoadon.dto';

@Injectable()
export class ChitiethoadonsService {
  create(createChitiethoadonDto: CreateChitiethoadonDto) {
    return 'This action adds a new chitiethoadon';
  }

  findAll() {
    return `This action returns all chitiethoadons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chitiethoadon`;
  }

  update(id: number, updateChitiethoadonDto: UpdateChitiethoadonDto) {
    return `This action updates a #${id} chitiethoadon`;
  }

  remove(id: number) {
    return `This action removes a #${id} chitiethoadon`;
  }
}
