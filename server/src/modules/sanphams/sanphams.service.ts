import { Injectable } from '@nestjs/common';
import { CreateSanphamDto } from './dto/create-sanpham.dto';
import { UpdateSanphamDto } from './dto/update-sanpham.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sanpham } from './entities/sanpham.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SanphamsService {

  constructor(@InjectRepository(Sanpham) private sanPhamRepo: Repository<Sanpham>) {}

  async create(createSanphamDto: CreateSanphamDto) {
    const errors = {};
    const { Ten, SoLuong, MoTa, Gia, BaoHanh, IdHang, IdLoai } = createSanphamDto;
    if(Ten.trim() == '') errors['Ten'] = "Vui lòng nhập tên sản phẩm";
    if(+SoLuong < 0) errors['SoLuong'] = "Số lượng không hợp lệ";
    if(+Gia < 0) errors['Gia'] = "Giá bán không hợp lệ";
    if(+BaoHanh < 0) errors['BaoHanh'] = "Bảo hành không hợp lệ";
    const create = { Ten, SoLuong, MoTa, Gia, BaoHanh };
    if(IdHang != null && +IdHang > 0) create['IdHang'] = +IdHang;
    if(IdLoai != null && +IdLoai > 0) create['IdLoai'] = +IdLoai;

    if(Object.keys(errors).length <= 0) {
      const sanpham = this.sanPhamRepo.create(create);
      await this.sanPhamRepo.save(sanpham);

      return { state: true, notify: "Thêm sản phẩm thành công" }
    }

    return { state: false, messages: errors }
  }

  async findSanPham(page: number, quantity: number = 50) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [results, total] = await this.sanPhamRepo.findAndCount({
      take: quantity,
      skip: (page - 1) * quantity
    });

    const totalSanPham = await this.findTotalSanPham();

    return {
      data: results,
      total: totalSanPham,
      page: page,
      totalPages: Math.ceil(totalSanPham / quantity),
    };
  }

  async findTotalSanPham() {
    return await this.sanPhamRepo.count();
  }

  findAll() {
    return `This action returns all sanphams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sanpham`;
  }

  update(id: number, updateSanphamDto: UpdateSanphamDto) {
    return `This action updates a #${id} sanpham`;
  }

  remove(id: number) {
    return `This action removes a #${id} sanpham`;
  }
}
