import { Injectable } from '@nestjs/common';
import { CreateHoadonDto } from './dto/create-hoadon.dto';
import { UpdateHoadonDto } from './dto/update-hoadon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hoadon } from './entities/hoadon.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class HoadonsService {

  constructor(@InjectRepository(Hoadon) private hoaDonRepo: Repository<Hoadon>) {}

  create(createHoadonDto: CreateHoadonDto) {
    return 'This action adds a new hoadon';
  }

  async findTotalHoaDon() {
    const total = await this.hoaDonRepo.count();
    return total;
  }

  async findHoaDonByMonth(month: number = 1, page: number = 1, quantity: number = 50) {
    const now = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - (month - 1));
    startDate.setDate(1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // let searchs = search?.trim();
    // const [months, day, year] = searchs.split("/");
    // searchs = months && day && year ? `${year}-${months}-${day}` : "";
    // console.log(searchs)
    const [results, total] = await this.hoaDonRepo
      .createQueryBuilder('hd')
      .leftJoinAndSelect('hd.chitiethoadons', 'ct')
      .leftJoinAndSelect('ct.sanpham', 'sp')
      .where('hd.state = 2')
      .where('hd.NgayMua BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      })
      .skip((page - 1) * quantity)
      .take(quantity)
      .getManyAndCount();

    const resultsWithTotal = results.map((hd) => {
      const totalValue = hd.chitiethoadons.reduce(
      (sum, ct) => sum + ct.SoLuong * ct.GiaBan, 0);
      return { ...hd, totalValue };
    });

    const totalotaHoaDon = await this.findTotalHoaDon();

    return {
      data: resultsWithTotal,
      total: totalotaHoaDon,
      page: page,
      totalPages: Math.ceil(totalotaHoaDon / quantity),
    };
  }

  findAll() {
    return this.hoaDonRepo.find({ relations: ['chitiethoadons'] });
  }

  findOne(id: number) {
    const hoadon = this.hoaDonRepo
      .createQueryBuilder('hd')
      .leftJoinAndSelect('hd.chitiethoadons', 'ct')
      .leftJoinAndSelect('ct.sanpham', 'sp')
      .where('hd.IdHoaDon = :id', { id })
      .getOne();

    return hoadon;
  }

  update(id: number, updateHoadonDto: UpdateHoadonDto) {
    return `This action updates a #${id} hoadon`;
  }

  remove(id: number) {
    return `This action removes a #${id} hoadon`;
  }
}
