import { Injectable } from '@nestjs/common';
import { CreateLoaiDto } from './dto/create-loai.dto';
import { UpdateLoaiDto } from './dto/update-loai.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loai } from './entities/loai.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoaisService {

  constructor(@InjectRepository(Loai) private loaiRepo: Repository<Loai>) {}

  create(createLoaiDto: CreateLoaiDto) {
    return 'This action adds a new loai';
  }

  async findAll() {
    return await this.loaiRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} loai`;
  }

  update(id: number, updateLoaiDto: UpdateLoaiDto) {
    return `This action updates a #${id} loai`;
  }

  remove(id: number) {
    return `This action removes a #${id} loai`;
  }
}
