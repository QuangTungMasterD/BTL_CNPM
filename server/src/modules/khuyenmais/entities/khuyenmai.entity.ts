import { Sanpham } from "src/modules/sanphams/entities/sanpham.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('khuyenmais')
export class KhuyenMai {
  @PrimaryGeneratedColumn()
  IdKhuyenMai: number;

  @Column()
  IdSanPham: number;

  @Column()
  TenKM: number;

  @Column()
  MucGiam: number;

  @Column({ type: 'datetime' })
  NgayBD: Date;

  @Column()
  NgayKT: Date;

  @ManyToOne(() => Sanpham, (sp) => sp.khuyenmais, { onDelete: 'CASCADE' })
  sanpham: Sanpham
}
