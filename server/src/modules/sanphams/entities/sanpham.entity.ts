import { Chitiethoadon } from "src/modules/chitiethoadons/entities/chitiethoadon.entity";
import { Danhgia } from "src/modules/danhgias/entities/danhgia.entity";
import { Hang } from "src/modules/hangs/entities/hang.entity";
import { KhuyenMai } from "src/modules/khuyenmais/entities/khuyenmai.entity";
import { Loai } from "src/modules/loais/entities/loai.entity";
import { Thongsokythuat } from "src/modules/thongsokythuats/entities/thongsokythuat.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('sanphams')
export class Sanpham {
  @PrimaryGeneratedColumn()
  IdSanPham: number;

  @Column()
  Ten: string;
  
  @Column()
  Gia: number;
  
  @Column()
  SoLuong: number;
  
  @Column({ nullable: true })
  MoTa: string;
  
  @Column({ nullable: true })
  BaoHanh: number;

  @Column({ nullable: true })
  IdHang: number | null;

  @Column({ nullable: true })
  IdLoai: number | null;

  @OneToMany(() => Danhgia, (danhgia) => danhgia.sanpham)
  danhgias: Danhgia[]

  @OneToMany(() => Thongsokythuat, (tskt) => tskt.sanpham, { cascade: true })
  thongsokythuats: Thongsokythuat[]

  @OneToMany(() => KhuyenMai, (km) => km.sanpham, { cascade: true })
  khuyenmais: KhuyenMai[]

  @ManyToOne(() => Loai, (lo) => lo.sanphams, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'IdLoai' })
  loai: Loai
  
  @ManyToOne(() => Hang, (ha) => ha.sanphams, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'IdHang' })
  hang: Hang

  @OneToMany(() => Chitiethoadon, (cthd) => cthd.sanpham)
  chitiethoadons: Chitiethoadon;
}
