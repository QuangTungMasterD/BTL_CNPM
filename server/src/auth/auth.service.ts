import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(Auth) private taiKhoanRepo: Repository<Auth>) {}

  async validateUser(username: string, password: string) {
    const user = await this.taiKhoanRepo.findOne({ where: { Username: username, MatKhau: password }, relations: ['nhanvien'] });
    if (!user) {
      return { state: true, message: "Tên đăng nhập hoặc mật khẩu sai." }
    }

    if(!user.nhanvien) {
      return { state: true, message: "Tên đăng nhập hoặc mật khẩu sai." }
    }

    if(user.nhanvien.ChucVu != 'QuanLy') {
      return { state: true, message: "Tên đăng nhập hoặc mật khẩu sai." }
    }
    return await this.login(user);
  }

  async login(user: Auth) {
    const payload = { sub: user.IdTaiKhoan, username: user.Username, role: user.nhanvien.ChucVu };
    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET!),
    };
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
