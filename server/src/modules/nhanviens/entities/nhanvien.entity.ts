
import { Taikhoan } from "src/modules/taikhoans/entities/taikhoan.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('nhanviens')
export class Nhanvien {
  @PrimaryGeneratedColumn({name: 'IdNhanVien'})
  IdNhanVien: number;

  @Column()
  Ten: string;

  @Column()
  SDT: string;

  @Column()
  CCCD: string

  @Column({ nullable: true })
  DiaChi: string;

  @Column({ type: 'date', nullable: true, default: null })
  NgaySinh: Date

  @Column()
  ChucVu: string;

  @Column()
  Luong: number

  @OneToOne(() => Taikhoan, (taiKhoan) => taiKhoan.nhanvien)
  @JoinColumn({ name: 'IdTaiKhoan' })
  taikhoan: Taikhoan
}
