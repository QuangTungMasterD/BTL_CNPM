import { Injectable } from '@nestjs/common';
import { CreateNhanvienDto } from './dto/create-nhanvien.dto';
import { UpdateNhanvienDto } from './dto/update-nhanvien.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nhanvien } from './entities/nhanvien.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NhanviensService {

  constructor(@InjectRepository(Nhanvien) private nhanVienRepo: Repository<Nhanvien>) {}

  async create(CreateNhanvienDto: CreateNhanvienDto) {
    return 'This action adds a new nhanvien';
  }

  async findTotalNhanVien() {
    const total = await this.nhanVienRepo.count();
    return total;
  }

  async findAll() {
    return await this.nhanVienRepo.find({});
  }

  async findOne(id: number) {
    return await this.nhanVienRepo.findOne({ where: { IdNhanVien: id } });
  }

  // async findByUsername(Username: string) {
  //   return await this.nhanVienRepo
  //     .createQueryBuilder('nv')
  //     .leftJoinAndSelect('nv.taikhoan', 'tk')
  //     .where('tk.Username = :Username', { Username })
  //     .getOne();
  // }

  update(id: number, updateNhanvienDto: UpdateNhanvienDto) {
    return `This action updates a #${id} nhanvien`;
  }

  remove(id: number) {
    return `This action removes a #${id} nhanvien`;
  }
}
