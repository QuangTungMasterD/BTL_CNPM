
import { Taikhoan } from 'src/modules/taikhoans/entities/taikhoan.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('vaitros')
export class Vaitro {
  @PrimaryGeneratedColumn({ name: 'IdVaiTro' })
  IdVaiTro: number;

  @Column({ name: 'TenVaiTro' })
  TenVaiTro: string;

  @OneToMany(() => Taikhoan, (tk) => tk.vaitro)
  taikhoans: Taikhoan[];
}