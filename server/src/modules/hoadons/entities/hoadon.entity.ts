import { Chitiethoadon } from "src/modules/chitiethoadons/entities/chitiethoadon.entity";
import { Khachhang } from "src/modules/khachhangs/entities/khachhang.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('hoadons')
export class Hoadon {
  @PrimaryGeneratedColumn()
  IdHoaDon: number;

  @Column({ nullable: true })
  IdKhachHang: number | null;

  @Column()
  NgayMua: Date;

  @Column()
  State: number;

  @ManyToOne(() => Khachhang, (kh) => kh.hoadons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'IdKhachHang' })
  khachhang: Khachhang;

  @OneToMany(() => Chitiethoadon, (cthd) => cthd.hoadon)
  chitiethoadons: Chitiethoadon[];
}
