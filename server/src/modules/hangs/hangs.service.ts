import { Injectable } from '@nestjs/common';
import { CreateHangDto } from './dto/create-hang.dto';
import { UpdateHangDto } from './dto/update-hang.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hang } from './entities/hang.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HangsService {

  constructor(@InjectRepository(Hang) private hangRepo: Repository<Hang>) {}

  create(createHangDto: CreateHangDto) {
    return 'This action adds a new hang';
  }

  async findAll() {
    return await this.hangRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} hang`;
  }

  update(id: number, updateHangDto: UpdateHangDto) {
    return `This action updates a #${id} hang`;
  }

  remove(id: number) {
    return `This action removes a #${id} hang`;
  }
}
