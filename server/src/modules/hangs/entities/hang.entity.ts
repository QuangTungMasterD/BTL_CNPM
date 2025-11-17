import { Sanpham } from "src/modules/sanphams/entities/sanpham.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('hangs')
export class Hang {
  @PrimaryGeneratedColumn()
  IdHang: number;

  @Column()
  TenHang: string;

  @OneToMany(() => Sanpham, (sp) => sp.hang)
  sanphams: Sanpham[]
}
