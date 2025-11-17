import { Sanpham } from "src/modules/sanphams/entities/sanpham.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('loais')
export class Loai {
  @PrimaryGeneratedColumn()
  IdLoai: number;

  @Column()
  TenLoai: string;

  @OneToMany(() => Sanpham, (sp) => sp.loai)
  sanphams: Sanpham[]
}
