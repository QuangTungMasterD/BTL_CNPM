import { Injectable } from '@nestjs/common';
import { CreateNhanvienDto } from './dto/create-nhanvien.dto';
import { UpdateNhanvienDto } from './dto/update-nhanvien.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nhanvien } from './entities/nhanvien.entity';
import { Repository } from 'typeorm';
import { TaikhoansService } from '../taikhoans/taikhoans.service';

@Injectable()
export class NhanviensService {

  constructor(@InjectRepository(Nhanvien) private nhanVienRepo: Repository<Nhanvien>,
    private taiKhoanService: TaikhoansService
  ) {}

  async findOneByCCCD(CCCD: string) {
    return await this.nhanVienRepo.findOne({ where: { CCCD } });
  }

  async findOneByPhone(SDT: string) {
    return await this.nhanVienRepo.findOne({ where: { SDT } });
  }

  async create(CreateNhanvienDto: CreateNhanvienDto) {
    const { Username, MatKhau, Confirm, SDT, CCCD, Ten, ChucVu, Luong, IdVaiTro } = CreateNhanvienDto;
    const errors = {};
    if(MatKhau != Confirm) errors['Confirm'] = "Xác nhận lại mật khẩu.";

    if(await this.taiKhoanService.findOneByUsername(Username)) {
      errors['Username'] = "tên đăng nhập đã tồn tại.";
    }
    if(await this.findOneByCCCD(CCCD)) {
      errors['CCCD'] = "CCCD đã tồn tại.";
    }
    if(await this.findOneByPhone(SDT)) {
      errors['SDT'] = "Số điện thoại đã tồn tại.";
    }
    if(Luong < 0) errors['Luong'] = "Lương không hợp lệ.";

    const createTaiKhoan = {
      Username, MatKhau, IdVaiTro
    }

    
    if(Object.keys(errors).length <= 0) {
      const isAddTaiKhoan = await this.taiKhoanService.create(createTaiKhoan);
      if(isAddTaiKhoan.state ) {
        const taikhoan = await this.taiKhoanService.findOneByUsername(Username);
        const createNhanVien = {
          Ten, ChucVu, Luong, CCCD, SDT, IdTaiKhoan: taikhoan?.IdTaiKhoan
        }
  
        const nhanvien = this.nhanVienRepo.create(createNhanVien)
        await this.nhanVienRepo.save(nhanvien);
  
        return { state: true, notify: 'Thêm nhân viên thành công.' }
      }
    }

    if(Object.keys(errors).length <= 0) return { state: false, notify: 'Thêm nhân viên thất bại.' };
    return { state: false, messages: errors }
  }

  async findTotalNhanVien() {
    const total = await this.nhanVienRepo.count();
    return total;
  }

  async findNhanVien(page: number = 1, quantity: number = 50) {
    const [results, total] = await this.nhanVienRepo.findAndCount({
      take: quantity,
      skip: (page - 1) * quantity,
      relations: ['taikhoan']
    });

    const totalotalNhanVien = await this.findTotalNhanVien();

    return {
      data: results,
      total: totalotalNhanVien,
      page: page,
      totalPages: Math.ceil(totalotalNhanVien / quantity),
    };
  }

  async findAll() {
    return await this.nhanVienRepo.find({});
  }

  async findOne(id: number) {
    return await this.nhanVienRepo.findOne({ where: { IdNhanVien: id }, relations: ['taikhoan'] });
  }

  // async findByUsername(Username: string) {
  //   return await this.nhanVienRepo
  //     .createQueryBuilder('nv')
  //     .leftJoinAndSelect('nv.taikhoan', 'tk')
  //     .where('tk.Username = :Username', { Username })
  //     .getOne();
  // }

  async update(id: number, updateNhanvienDto: UpdateNhanvienDto) {
    const { Username, MatKhau, Confirm, SDT, CCCD, Ten, ChucVu, Luong, IdVaiTro } = updateNhanvienDto;
    const errors = {};
    if(MatKhau != Confirm) errors['Confirm'] = "Xác nhận lại mật khẩu.";

    const tkUsername = await this.taiKhoanService.findOneByUsername(Username);
    if(tkUsername?.nhanvien.IdNhanVien != id && tkUsername) {
      errors['Username'] = "tên đăng nhập đã tồn tại.";
    }

    const tkCCCD = await this.findOneByCCCD(CCCD)
    if(tkCCCD?.IdNhanVien != id && tkCCCD) {
      errors['CCCD'] = "CCCD đã tồn tại.";
    }

    const tkSDT = await this.findOneByPhone(SDT)
    if(tkSDT?.IdNhanVien != id && tkSDT) {
      errors['SDT'] = "Số điện thoại đã tồn tại.";
    }
    if(Luong < 0) errors['Luong'] = "Lương không hợp lệ.";
    
    if(Object.keys(errors).length <= 0) {
      const nhanvien = await this.findOne(id);
      if(!nhanvien) return { state: false, notify: "Nhân viên không tồn tại." };
      
      nhanvien.Ten = Ten;
      nhanvien.CCCD = CCCD;
      nhanvien.SDT = SDT;
      nhanvien.Luong = Luong;
      nhanvien.ChucVu = ChucVu;
      console.log(nhanvien.taikhoan.Username)
      nhanvien.taikhoan.Username = Username;
      nhanvien.taikhoan.MatKhau = MatKhau;
      
      await this.nhanVienRepo.save(nhanvien);

      return { state: true, notify: 'Thêm nhân viên thành công.' }
    }

    if(Object.keys(errors).length <= 0) return { state: false, notify: 'Thêm nhân viên thất bại.' };
    return { state: false, messages: errors }
  }

  async remove(id: number) {
    const kh = await this.findOne(id);
    
    let state = false;
    let notify = 'Xóa nhân viên thất bại';
    if(kh) {
      const result = await this.nhanVienRepo.delete(id);
      const deleteTK = await this.taiKhoanService.remove(kh.taikhoan.IdTaiKhoan);
      state = (result.affected ?? 0) > 0 && (deleteTK.affected ?? 0) > 0;
      notify = state ? 'Xóa nhân viên thành công' : 'Xóa nhân viên thất bại';
    }
    return {
      state, notify
    }
  }
}
