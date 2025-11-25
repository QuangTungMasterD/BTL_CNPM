
import { InjectRepository } from '@nestjs/typeorm';
import { CreateKhuyenmaiDto } from './dto/create-khuyenmai.dto';
import { UpdateKhuyenmaiDto } from './dto/update-khuyenmai.dto';
import { KhuyenMai } from './entities/khuyenmai.entity';
import { Like, Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SanphamsService } from '../sanphams/sanphams.service';

@Injectable()
export class KhuyenmaisService {

  constructor(
    @InjectRepository(KhuyenMai) private khuyenMaiRepo: Repository<KhuyenMai>,
    @Inject(forwardRef(() => SanphamsService))
    private sanPhamService: SanphamsService
  ) {}

  async create(createKhuyenmaiDto: CreateKhuyenmaiDto) {
    console.log(1)
    const errors = {};
    const { IdSanPham, MucGiam, NgayBD, NgayKT } = createKhuyenmaiDto;

    const sanpham = await this.sanPhamService.findOne(IdSanPham);
    if(!sanpham) errors['IdSanPham'] = 'Sản phẩm không hợp lệ.';
    if(MucGiam <= 0) errors['MucGiam'] = 'Giảm giá không hợp lệ';
    if (new Date(NgayKT) <= new Date(NgayBD)) errors['NgayKT'] = 'Ngày kết thúc không hợp lệ';

    if (Object.keys(errors).length <= 0) {
      const khuyenmai = this.khuyenMaiRepo.create(createKhuyenmaiDto);
      await this.khuyenMaiRepo.save(khuyenmai);

      return { state: true, notify: "Thêm khuyến mại thành công" }
    }

    return { state: false, messages: errors }
  }

  async findKhuyenMai(page: number, search: string, quantity: number = 50) {
    let searchs = search?.trim();
    // const [month, day, year] = searchs.split("/");
    // searchs = `${year}-${month}-${day}`;

    const where = searchs ? [
        { MucGiam: Like(`%${searchs}%`) },
        { NgayBD: Like(`%${searchs}%`) },
        { NgayKT: Like(`%${searchs}%`) },
        { TenKM: Like(`%${searchs}%`) },
        { sanpham: {
          Ten: Like(`%${searchs}%`),
        } },
        { sanpham: { Gia: Like(`%${searchs}%`) }}
      ]
    : {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [results, total] = await this.khuyenMaiRepo.findAndCount({
      where,
      take: quantity,
      skip: (page - 1) * quantity,
      relations: ['sanpham'],
    });

    const totalKhuyenMai = await this.findTotalKhuyenMai();

    return {
      data: results,
      total: totalKhuyenMai,
      page: page,
      totalPages: Math.ceil(totalKhuyenMai / quantity),
    };
  }

  async findTotalKhuyenMai() {
    return await this.khuyenMaiRepo.count();
  }

  findAll() {
    return `This action returns all khuyenmais`;
  }

  findOne(id: number) {
    return this.khuyenMaiRepo.findOne({ where: { IdKhuyenMai: id } });
  }

  async update(id: number, updateKhuyenmaiDto: UpdateKhuyenmaiDto) {
    const khuyenmai = await this.findOne(id);

    if(!khuyenmai) {
      return { state: false, notify: "Khuyến mãi không tồn tại" }
    }
    const errors = {};
    const { IdSanPham, MucGiam, NgayBD, NgayKT } = updateKhuyenmaiDto;

    const sanpham = await this.sanPhamService.findOne(IdSanPham);
    if(!sanpham) errors['IdSanPham'] = 'Sản phẩm không hợp lệ.';

    if(MucGiam <= 0) errors['MucGiam'] = 'Giảm giá không hợp lệ';
    if (new Date(NgayKT) <= new Date(NgayBD)) errors['NgayKT'] = 'Ngày kết thúc không hợp lệ';
    if(Object.keys(errors).length <= 0) {
      Object.assign(khuyenmai, updateKhuyenmaiDto);
      await this.khuyenMaiRepo.save(khuyenmai);
  
      return { state: true, notify: "Sửa khuyến mãi thành công." }
    }

    return { state: false, messages: errors };
  }

  async remove(id: number) {
    const km = await this.khuyenMaiRepo.findOne({ where: { IdKhuyenMai: id } });

    if(km) {
      await this.khuyenMaiRepo.remove(km);
      return { state: true, notify: 'Xóa khuyến mãi thành công.' }
    }

    return { state: false, notify: 'Xóa khuyến mãi thất bại.' }
  }
}
