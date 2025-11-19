import { Injectable } from '@nestjs/common';
import { CreateHangDto } from './dto/create-hang.dto';
import { UpdateHangDto } from './dto/update-hang.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hang } from './entities/hang.entity';
import { Repository } from 'typeorm';
import { SanphamsService } from '../sanphams/sanphams.service';
import { Sanpham } from '../sanphams/entities/sanpham.entity';

@Injectable()
export class HangsService {

  constructor(@InjectRepository(Hang) private hangRepo: Repository<Hang>,
    private sanPhamRepo: SanphamsService
  ) {}

  async create(createHangDto: CreateHangDto) {
    let { TenHang } = createHangDto;
    TenHang = TenHang.toLowerCase();
    const hang = await this.hangRepo.findOne({ where: { TenHang } })
    if(hang) {
      return { state: false, message: 'Hãng này đã tồn tại.' };
    }

    const newHang = this.hangRepo.create(createHangDto);
    await this.hangRepo.save(newHang);

    return { state: true, notify: "Thêm hãng mới thành công." }
  }

  async findAll() {
    const result = await this.hangRepo.find({ relations: ['sanphams'] });
    const resultFn = result.map((item) => {

      const sum = item.sanphams.length;
      const final = { IdHang: item.IdHang, TenHang: item.TenHang, sanphams: sum }
      return final;
    })
    return resultFn;
  }

  async findOne(id: number) {
    return await this.hangRepo.findOne({ where: { IdHang: id } })
  }

  async update(id: number, updateHangDto: UpdateHangDto) {
    const hang = await this.hangRepo.findOne({ where: { TenHang: updateHangDto.TenHang } })
    if((hang?.TenHang == updateHangDto.TenHang && hang.IdHang != id)) {
      return { state: false, message: 'Hãng này đã tồn tại.' };
    }
    
    const hangId = await this.hangRepo.findOne({ where: { IdHang: id } })
    if(hangId) {
      hangId.TenHang = updateHangDto.TenHang;
      await this.hangRepo.save(hangId);
  
      return { state: true, notify: "Sửa hãng thành công." }
    }

    return { state: false, notify: 'Hãng này không tồn tại.' }

  }

  async remove(id: number) {
    const hang = await this.hangRepo.findOne({ where: {IdHang: id}, relations: ['sanphams'] });

    if(!hang) return { state: false, notify: "Xóa hãng thất bại." };

    for (const sp of hang.sanphams) {
      sp.IdHang = null;
      await this.sanPhamRepo.save(sp);
    }

    if(hang) {
      await this.hangRepo.remove(hang);

      return { state: true, notify: "Xóa hãng thành công." }
    }
  }
}
