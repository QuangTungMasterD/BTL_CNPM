import { Injectable } from '@nestjs/common';
import { CreateLoaiDto } from './dto/create-loai.dto';
import { UpdateLoaiDto } from './dto/update-loai.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loai } from './entities/loai.entity';
import { Repository } from 'typeorm';
import { SanphamsService } from '../sanphams/sanphams.service';

@Injectable()
export class LoaisService {

  constructor(@InjectRepository(Loai) private loaiRepo: Repository<Loai>,
    private sanPhamRepo: SanphamsService
  ) {}

  async create(createLoaiDto: CreateLoaiDto) {
    let { TenLoai } = createLoaiDto;
    TenLoai = TenLoai.toLowerCase();
    const loai = await this.loaiRepo.findOne({ where: { TenLoai } })
    if(loai) {
      return { state: false, message: 'Tên loại sản phẩm này đã tồn tại.' };
    }

    const newloai = this.loaiRepo.create(createLoaiDto);
    await this.loaiRepo.save(newloai);

    return { state: true, notify: "Thêm sản phẩm mới thành công." }
  }

  async findAll() {
    const result = await this.loaiRepo.find({ relations: ['sanphams'] });
    const resultFn = result.map((item) => {

      const sum = item.sanphams.length;
      const final = { IdLoai: item.IdLoai, TenLoai: item.TenLoai, sanphams: sum }
      return final;
    })
    return resultFn;
  }

  async findOne(id: number) {
    return await this.loaiRepo.findOne({ where: { IdLoai: id } })
  }

  async update(id: number, updateLoaiDto: UpdateLoaiDto) {
    const loai = await this.loaiRepo.findOne({ where: { TenLoai: updateLoaiDto.TenLoai } })
    if((loai?.TenLoai == updateLoaiDto.TenLoai && loai.IdLoai != id)) {
      return { state: false, message: 'loại sản phẩm này đã tồn tại.' };
    }
    
    const loaiId = await this.loaiRepo.findOne({ where: { IdLoai: id } })
    if(loaiId) {
      loaiId.TenLoai = updateLoaiDto.TenLoai;
      await this.loaiRepo.save(loaiId);
  
      return { state: true, notify: "Sửa loại sản phẩm thành công." }
    }

    return { state: false, notify: 'loại sản phẩm này không tồn tại.' }

  }

  async remove(id: number) {
    const loai = await this.loaiRepo.findOne({ where: {IdLoai: id}, relations: ['sanphams'] });

    if(!loai) return { state: false, notify: "Xóa hãng thất bại." };

    for (const sp of loai.sanphams) {
      sp.IdLoai = null;
      await this.sanPhamRepo.save(sp);
    }

    if(loai) {
      await this.loaiRepo.remove(loai);

      return { state: true, notify: "Xóa hãng thành công." }
    }
  }
}
