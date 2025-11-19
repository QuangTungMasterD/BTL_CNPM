'use client'

import Button from "@/ui/components/Button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface SanPham {
  IdSanPham: number;
  Ten: string;
  Gia: number;
  SoLuong: number;
  MoTa: string;
  BaoHanh: number;
  IdHang: number | null;
  IdLoai: number | null;
}

export interface ChiTietHoaDon {
  IdChiTietHoaDon: number;
  IdHoaDon: number;
  IdSanPham: number;
  SoLuong: number;
  GiaBan: number;
  sanpham: SanPham | null;
}

export interface HoaDon {
  IdHoaDon: number;
  IdKhachHang: number | null;
  NgayMua: string;
  State: number;
  chitiethoadons: ChiTietHoaDon[];
}

function DetailRevenue() {
  const param = useParams();
  const id = param.id;
  const [hoaDon, setHoaDon] = useState<HoaDon>();

  useEffect(() => {
    fetch(`${process.env.API}/hoadons/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setHoaDon(data);
      });
  }, []);

  return (
    <div className="w-[600px] bg-white mx-auto p-4 shadow rounded-b-lg">
      <div className="uppercase text-3xl text-[var(--primary-color)] flex items-center justify-center">Chi tiết hóa Đơn</div>
      <div className="mt-9">
        {hoaDon?.chitiethoadons.map((item, index) => {
          return (
            <div className="flex text-gray-600 pb-1 justify-between border-b border-gray-300" key={index}>
              <p className="text-lg">{item.sanpham?.Ten}</p>
              <div className="">
                <p className="">Số lượng: {item.SoLuong}</p>
                <p className="mt-1">Giá bán: {item.GiaBan}đ</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 flex justify-between text-xl">
        <p className="text-sm text-gray-600">{new Date(hoaDon?.NgayMua ?? '').toLocaleDateString()}</p>
        <p className="flex">Tổng hóa đơn: <p className="text-[var(--primary-color)] ml-1">{hoaDon?.chitiethoadons.reduce((sum, ct) => ct.GiaBan * ct.SoLuong, 0)}đ</p></p>
      </div>
      <div className="flex justify-center mt-8">
        <Button href="/manager/revenue">{"<"} Doanh thu</Button>
      </div>
    </div>
  );
}

export default DetailRevenue;
