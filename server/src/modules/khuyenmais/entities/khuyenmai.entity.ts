import { Sanpham } from "src/modules/sanphams/entities/sanpham.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('khuyenmais')
export class KhuyenMai {
  @PrimaryGeneratedColumn()
  IdKhuyenMai: number;

  @Column()
  IdSanPham: number;

  @Column({ nullable: true })
  TenKM: string;

  @Column()
  MucGiam: number;

  @Column({ type: 'datetime' })
  NgayBD: Date;

  @Column()
  NgayKT: Date;

  @ManyToOne(() => Sanpham, (sp) => sp.khuyenmais, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'IdSanPham' })
  sanpham: Sanpham
}
