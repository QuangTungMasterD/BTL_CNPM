
import { CreateTaikhoanDto } from './dto/create-taikhoan.dto';
import { UpdateTaikhoanDto } from './dto/update-taikhoan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Taikhoan } from './entities/taikhoan.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaikhoansService {

  constructor(@InjectRepository(Taikhoan) private taiKhoanRepo: Repository<Taikhoan>) {}

  async create(createTaikhoanDto: CreateTaikhoanDto) {
    try {
      const { Username } = createTaikhoanDto;
      const errors = {}

      const existingName = await this.taiKhoanRepo.findOne({
        where: { Username },
      });

      if (existingName) {
        errors['Username'] = 'Tên đăng nhập đã tồn tại';
      }

      if(Object.keys(errors).length <= 0) {
        const newTaikhoan = this.taiKhoanRepo.create(createTaikhoanDto);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const saved = await this.taiKhoanRepo.save(newTaikhoan);
  
        return { state: true, messages: { res: 'Tạo tài khoản thành công' } };
      }

      return { state: false, messages: errors };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { state: false, messages: { res:'Tạo tài khoản thất bại'} };
    }
  }

  async findAll() {
    return this.taiKhoanRepo.find({
      relations: ['vaitro'],
    });
  }

  async findOne(id: number) {
    return this.taiKhoanRepo.findOne({ where: { IdTaiKhoan: id }, relations: ['vaitro'] })
  }

  async findOneByUsername(username: string) {
    return await this.taiKhoanRepo.findOne({ where: { Username: username }, relations: ['vaitro', 'khachhang', 'nhanvien'] })
  }

  async update(id: number, updateTaikhoanDto: UpdateTaikhoanDto) {
    const taikhoan = await this.taiKhoanRepo.findOne({ where: { IdTaiKhoan: id } });
    const errors = [];

    if(taikhoan) {
      Object.assign(taikhoan, updateTaikhoanDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updated = await this.taiKhoanRepo.save(taikhoan);
    }
    errors['exist'] = 'Tài khoản không tồn tại';

  }

  remove(id: number) {
    return this.taiKhoanRepo.delete({ IdTaiKhoan: id });
  }
}
