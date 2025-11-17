import { Injectable } from '@nestjs/common';
import { CreateVaitroDto } from './dto/create-vaitro.dto';
import { UpdateVaitroDto } from './dto/update-vaitro.dto';

@Injectable()
export class VaitrosService {
  create(createVaitroDto: CreateVaitroDto) {
    return 'This action adds a new vaitro';
  }

  findAll() {
    return `This action returns all vaitros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vaitro`;
  }

  update(id: number, updateVaitroDto: UpdateVaitroDto) {
    return `This action updates a #${id} vaitro`;
  }

  remove(id: number) {
    return `This action removes a #${id} vaitro`;
  }
}
