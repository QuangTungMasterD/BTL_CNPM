import { Danhgia } from "src/modules/danhgias/entities/danhgia.entity";
import { Taikhoan } from "src/modules/taikhoans/entities/taikhoan.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('khachhangs')
export class Khachhang {
  @PrimaryGeneratedColumn()
  IdKhachHang: number;

  @Column()
  Ten: string;

  @Column()
  SDT: string;

  @Column({ nullable: true })
  Email: string;

  @Column({ nullable: true })
  DiaChi: string;

  @OneToOne(() => Taikhoan, (taikhoan) => taikhoan.khachhang, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'IdTaiKhoan' })
  taikhoan: Taikhoan

  @OneToMany(() => Danhgia, (danhgia) => danhgia.khachhang, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'IdKhachHang' })
  danhgias: Danhgia[]
}
