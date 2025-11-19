import { Injectable } from '@nestjs/common';
import { CreateKhachhangDto } from './dto/create-khachhang.dto';
import { UpdateKhachhangDto } from './dto/update-khachhang.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Khachhang } from './entities/khachhang.entity';
import { Repository } from 'typeorm';
import { TaikhoansService } from '../taikhoans/taikhoans.service';
import { Taikhoan } from '../taikhoans/entities/taikhoan.entity';

@Injectable()
export class KhachhangsService {

  constructor(
    @InjectRepository(Khachhang) private khachHangRepo: Repository<Khachhang>,
    private taiKhoanService: TaikhoansService
  ) {}

  async findKhachHangBySDT(SDT: string) {
    return await this.khachHangRepo.findOne({ where: { SDT } });
  }

  async create(CreateKhachhangDto) {
    let errors = {};
    if(CreateKhachhangDto.MatKhau != CreateKhachhangDto.Confirm) {
      errors['Confirm'] = "Xác nhận mật khẩu không giống."
    }

    if(await this.findKhachHangBySDT(CreateKhachhangDto.SDT) != null) {
      errors['SDT'] = "Số điện thoại đã tồn tại."
    }

    if(Object.keys(errors).length <= 0) {
      const result = await this.taiKhoanService.create({
        Username: CreateKhachhangDto.Username,
        MatKhau: CreateKhachhangDto.MatKhau,
        IdVaiTro: CreateKhachhangDto.IdVaiTro
      });
      
      if(!result.state) {
        errors = { ...errors, ...result.messages };
      }
    }


    if(Object.keys(errors).length <= 0) {
      const taikhoan = await this.taiKhoanService.findOneByUsername(CreateKhachhangDto.Username);
      if (taikhoan == null) {
        return { state: false, notify: 'Tạo tài khoản thất bại' };
      }

      const khachhang = await this.khachHangRepo.create({
        Ten: CreateKhachhangDto.Ten,
        SDT: CreateKhachhangDto.SDT,
        Email: CreateKhachhangDto.Email,
        taikhoan
      })
      await this.khachHangRepo.save(khachhang);
      return { state: true, notify: 'Thêm khách hàng thành công' };
    }

    return { state: false, messages: errors }
  }

  async findTotalKhachHang() {
    return await this.khachHangRepo.count();
  }

  async findKhachHang(page: number = 1, quantity: number = 50) {
    const [results, total] = await this.khachHangRepo.findAndCount({
      take: quantity,
      skip: (page - 1) * quantity,
      relations: ['taikhoan']
    });

    const totalKhachHang = await this.findTotalKhachHang();

    return {
      data: results,
      total: totalKhachHang,
      page: page,
      totalPages: Math.ceil(totalKhachHang / quantity),
    };
  }

  findAll() {
    return `This action returns all khachhangs`;
  }

  findOne(id: number) {
    return this.khachHangRepo.findOne({ where: { IdKhachHang: id }, relations: ['taikhoan'] });
  }

  async update(id: number, updateKhachhangDto: UpdateKhachhangDto) {
    try {
      const {SDT, Email, Ten, Username, MatKhau, Confirm } = updateKhachhangDto;
      const khachhang = await this.findOne(id);
      const errors = {};

      if (!khachhang) {
        return { state: false, notify: 'Không tìm thấy khách hàng' };
      }

      const khachhangBySDT = await this.findKhachHangBySDT(SDT ?? '');
      if(khachhangBySDT && khachhangBySDT.IdKhachHang != id) {
        errors['SDT'] = 'Số điện thoại đã tồn tại.';
      }

      const taikhoanUsername = await this.taiKhoanService.findOneByUsername(Username ?? '');
      if(taikhoanUsername && taikhoanUsername?.khachhang.IdKhachHang != id) {
        errors['Username'] = 'tên đăng nhập đã tồn tại.';
      }

      if(MatKhau != Confirm) {
        errors['Confirm'] = 'Mật khẩu nhập lại sai.';
      }

      if(Object.keys(errors).length <= 0) {
        if(Ten) khachhang.Ten = Ten;
        if(Email) khachhang.Email = Email;
        if(SDT) khachhang.SDT = SDT;
        if(Username) khachhang.taikhoan.Username = Username;
        if(MatKhau) khachhang.taikhoan.MatKhau = MatKhau;
        
        const saved = await this.khachHangRepo.save(khachhang);
  
        return { state: true, notify: 'Cập nhật khách hàng thành công' }
      }

      return { state: false, messages: errors }
    } catch(e) {
      return { state: false, notify: 'Cập nhật khách hàng thất bại' }
    }
  }

  async remove(id: number) {
    const kh = await this.findOne(id);
    
    let state = false;
    let notify = 'Xóa người dùng thất bại';
    if(kh) {
      const result = await this.khachHangRepo.delete(id);
      const deleteTK = await this.taiKhoanService.remove(kh.taikhoan.IdTaiKhoan);
      state = (result.affected ?? 0) > 0 && (deleteTK.affected ?? 0) > 0;
      notify = state ? 'Xóa người dùng thành công' : 'Xóa người dùng thất bại';
    }
    return {
      state, notify
    }
  }
}
