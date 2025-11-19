import { Hoadon } from "src/modules/hoadons/entities/hoadon.entity";
import { Sanpham } from "src/modules/sanphams/entities/sanpham.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('chitiethoadons')
export class Chitiethoadon {
  @PrimaryGeneratedColumn()
  IdChiTietHoaDon: number;

  @Column()
  IdHoaDon: number;

  @Column()
  IdSanPham: number;

  @Column()
  SoLuong: number;

  @Column()
  GiaBan: number;

  @ManyToOne(() => Hoadon, (hd) => hd.chitiethoadons)
  @JoinColumn({ name: 'IdHoaDon' })
  hoadon: Hoadon;

  @ManyToOne(() => Sanpham, (sp) => sp.chitiethoadons)
  @JoinColumn({ name: 'IdSanPham' })
  sanpham: Sanpham;
}
