import { Sanpham } from "src/modules/sanphams/entities/sanpham.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('thongsokythuats')
export class Thongsokythuat {
  @PrimaryGeneratedColumn()
  IdThongSo: number;

  @Column()
  IdSanPham: number;

  @Column()
  TenTS: string;

  @Column()
  GiaTri: string;

  @ManyToOne(() => Sanpham, (sp) => sp.thongsokythuats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'IdSanPham' })
  sanpham: Sanpham
}
