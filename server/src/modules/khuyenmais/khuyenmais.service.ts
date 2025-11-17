import { Injectable } from '@nestjs/common';
import { CreateKhuyenmaiDto } from './dto/create-khuyenmai.dto';
import { UpdateKhuyenmaiDto } from './dto/update-khuyenmai.dto';

@Injectable()
export class KhuyenmaisService {
  create(createKhuyenmaiDto: CreateKhuyenmaiDto) {
    return 'This action adds a new khuyenmai';
  }

  findAll() {
    return `This action returns all khuyenmais`;
  }

  findOne(id: number) {
    return `This action returns a #${id} khuyenmai`;
  }

  update(id: number, updateKhuyenmaiDto: UpdateKhuyenmaiDto) {
    return `This action updates a #${id} khuyenmai`;
  }

  remove(id: number) {
    return `This action removes a #${id} khuyenmai`;
  }
}
