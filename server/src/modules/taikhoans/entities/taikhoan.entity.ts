import { Khachhang } from 'src/modules/khachhangs/entities/khachhang.entity';
import { Nhanvien } from 'src/modules/nhanviens/entities/nhanvien.entity';
import { Vaitro } from 'src/modules/vaitros/entities/vaitro.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('taikhoans')
export class Taikhoan {
  @PrimaryGeneratedColumn()
  IdTaiKhoan: number;

  @Column()
  Username: string;

  @Column()
  MatKhau: string;

  @Column()
  IdVaiTro: number;

  @Column()
  Avatar: string;

  @ManyToOne(() => Vaitro, (vaiTro) => vaiTro.taikhoans)
  @JoinColumn({ name: 'IdVaiTro' })
  vaitro: Vaitro;
  
  @OneToOne(() => Nhanvien, (nhanvien) => nhanvien.taikhoan, { onDelete: 'CASCADE' })
  nhanvien: Nhanvien;

  @OneToOne(() => Khachhang, (khachhang) => khachhang.taikhoan, { onDelete: 'CASCADE' })
  khachhang: Khachhang;
}
