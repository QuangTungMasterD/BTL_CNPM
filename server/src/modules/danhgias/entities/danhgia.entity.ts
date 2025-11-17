import { Khachhang } from "src/modules/khachhangs/entities/khachhang.entity";
import { Sanpham } from "src/modules/sanphams/entities/sanpham.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('danhgias')
export class Danhgia {
  @PrimaryGeneratedColumn()
  IdDanhGia: number;
  
  @Column()
  SoSao: number;

  @Column()
  Content: string;

  @Column()
  CreateAt: Date;

  @ManyToOne(() => Khachhang, (kh) => kh.danhgias, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'IdSKhachHang' })
  khachhang: Khachhang

  @ManyToOne(() => Sanpham, (sp) => sp.danhgias, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'IdSanPham' })
  sanpham: Sanpham
}
