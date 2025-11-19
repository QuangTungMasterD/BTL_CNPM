import { Injectable } from '@nestjs/common';
import { CreateDanhgiaDto } from './dto/create-danhgia.dto';
import { UpdateDanhgiaDto } from './dto/update-danhgia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Danhgia } from './entities/danhgia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DanhgiasService {

  constructor(@InjectRepository(Danhgia) private danhGiaRepo: Repository<Danhgia>) {}

  create(createDanhgiaDto: CreateDanhgiaDto) {
    return 'This action adds a new danhgia';
  }

  async calcDanhGiaSanPham(id: number) {
    const [data, total] = await this.danhGiaRepo.findAndCount({ where: { IdSanPham: id } });
    let totalDanhGia = 0;
    let danhGia = 5;
    
    if(total) {
      data.forEach((items) => {
        totalDanhGia =+ items.SoSao;
      })
      danhGia = totalDanhGia / total
    }

    return danhGia;
  }

  async calcDanhGiaCuaHang() {
    const [data, total] = await this.danhGiaRepo.findAndCount();
    let totalDanhGia = 0;
    let danhGia = 5;
    if(total) {
      data.forEach((items) => {
        totalDanhGia =+ items.SoSao;
      })
      danhGia = totalDanhGia / total
    }

    return danhGia;
  }

  findAll() {
    return `This action returns all danhgias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} danhgia`;
  }

  update(id: number, updateDanhgiaDto: UpdateDanhgiaDto) {
    return `This action updates a #${id} danhgia`;
  }

  remove(id: number) {
    return `This action removes a #${id} danhgia`;
  }
}
