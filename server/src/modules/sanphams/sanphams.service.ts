import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateSanphamDto } from './dto/create-sanpham.dto';
import { UpdateSanphamDto } from './dto/update-sanpham.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sanpham } from './entities/sanpham.entity';
import { Like, Repository } from 'typeorm';
import { ThongsokythuatsService } from '../thongsokythuats/thongsokythuats.service';
import { KhuyenmaisService } from '../khuyenmais/khuyenmais.service';

@Injectable()
export class SanphamsService {

  constructor(@InjectRepository(Sanpham) private sanPhamRepo: Repository<Sanpham>,
    private thongsoService: ThongsokythuatsService,
    @Inject(forwardRef(() => KhuyenmaisService))
    private khuyenMaiService: KhuyenmaisService
  ) { }

  async save(sanpham: Sanpham) {
    await this.sanPhamRepo.save(sanpham);
  }

  async create(createSanphamDto: CreateSanphamDto) {
    const errors = {};
    const { Ten, SoLuong, MoTa, Gia, BaoHanh, IdHang, IdLoai } = createSanphamDto;
    if (Ten.trim() == '') errors['Ten'] = "Vui lòng nhập tên sản phẩm";
    if (+SoLuong < 0) errors['SoLuong'] = "Số lượng không hợp lệ";
    if (+Gia < 0) errors['Gia'] = "Giá bán không hợp lệ";
    if (+BaoHanh < 0) errors['BaoHanh'] = "Bảo hành không hợp lệ";
    const create = { Ten, SoLuong, MoTa, Gia, BaoHanh };
    if (IdHang != null && +IdHang > 0) create['IdHang'] = +IdHang;
    if (IdLoai != null && +IdLoai > 0) create['IdLoai'] = +IdLoai;

    if (Object.keys(errors).length <= 0) {
      const sanpham = this.sanPhamRepo.create(create);
      await this.sanPhamRepo.save(sanpham);

      return { state: true, notify: "Thêm sản phẩm thành công" }
    }

    return { state: false, messages: errors }
  }

  async findSanPham(page: number, search: string, quantity: number = 50) {
    const searchs = search?.trim();

    const where = searchs ? [
        { Ten: Like(`%${searchs}%`) },
        { Gia: Like(`%${searchs}%`) },
        { BaoHanh: Like(`%${searchs}%`) },
        { SoLuong: Like(`%${searchs}%`) },
      ]
    : {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [results, total] = await this.sanPhamRepo.findAndCount({
      where,
      take: quantity,
      skip: (page - 1) * quantity
    });

    const totalSanPham = await this.findTotalSanPham();

    return {
      data: results,
      total: totalSanPham,
      page: page,
      totalPages: Math.ceil(total / quantity),
    };
  }

  async findTotalSanPham() {
    return await this.sanPhamRepo.count();
  }

  findAll() {
    return this.sanPhamRepo.find();
  }

  findOne(id: number) {
    return this.sanPhamRepo.findOne({ where: { IdSanPham: id }, relations: ['thongsokythuats', 'loai', 'hang'] });
  }

  async update(id: number, updateSanphamDto: UpdateSanphamDto) {
    const sanpham = await this.findOne(id);
    const errors = {};
    const { Ten, SoLuong, MoTa, Gia, BaoHanh, IdHang, IdLoai } = updateSanphamDto;

    if (Ten.trim() == '') errors['Ten'] = "Vui lòng nhập tên sản phẩm";
    if (+SoLuong < 0) errors['SoLuong'] = "Số lượng không hợp lệ";
    if (+Gia < 0) errors['Gia'] = "Giá bán không hợp lệ";
    if (+BaoHanh < 0) errors['BaoHanh'] = "Bảo hành không hợp lệ";

    if(Object.keys(errors).length > 0) {
      return { state: false, messages: errors }
    }

    if(sanpham) {
      sanpham.Ten = Ten ?? sanpham.Ten;
      sanpham.SoLuong = SoLuong ?? sanpham.SoLuong;
      sanpham.MoTa = MoTa ?? sanpham.MoTa;
      sanpham.Gia = Gia ?? sanpham.Gia;
      sanpham.BaoHanh = BaoHanh ?? sanpham.BaoHanh;
      sanpham.IdHang = IdHang ?? null;
      sanpham.IdLoai = IdLoai ?? null;
      if (IdHang != null && +IdHang < 0) sanpham.IdHang = null;
      if (IdLoai != null && +IdLoai < 0) sanpham.IdLoai = null;

      await this.sanPhamRepo.save(sanpham);

      return { state: true, notify: "Cập nhật sản phẩm thành công" }
    }

    return { state: true, notify: "Cập nhật sản phẩm thất bại" }
  }

  async remove(id: number) {
    const sanpham = await this.sanPhamRepo.findOne({
      where: { IdSanPham: id },
      relations: ['thongsokythuats', 'khuyenmais'],
    });

    if (!sanpham) {
      return {
        state: false,
        notify: 'Không tìm thấy sản phẩm',
      };
    }

    const thongsos = sanpham.thongsokythuats;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    thongsos.forEach(async (item) => {
      const result = await this.thongsoService.remove(item.IdThongSo);
    })

    const khuyenmais = sanpham.khuyenmais;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    khuyenmais.forEach(async (item) => {
      const result = await this.khuyenMaiService.remove(item.IdKhuyenMai);
    })

    try {
      await this.sanPhamRepo.remove(sanpham);
      return {
        state: true,
        notify: 'Xóa sản phẩm thành công',
      };
    } catch (error) {
      return {
        state: false,
        notify: 'Xóa sản phẩm thất bại: ',
      };
    }
  }
}
