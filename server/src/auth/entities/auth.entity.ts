
import { Khachhang } from "src/modules/khachhangs/entities/khachhang.entity";
import { Nhanvien } from "src/modules/nhanviens/entities/nhanvien.entity";
import { Vaitro } from "src/modules/vaitros/entities/vaitro.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('taikhoans')
export class Auth {
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
