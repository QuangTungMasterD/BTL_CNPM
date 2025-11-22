"use client";

import ThongSoInput from "@/ui/manager/ThongSoInput";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ThongSo {
  TenTS: string;
  GiaTri: string;
}

function ChiTietSanPham() {
  const params = useParams();
  const id = params.id;
  const [sanPham, setSanPham] = useState({
    IdSanPham: 0,
    Ten: "",
    MoTa: "",
    BaoHanh: 0,
    SoLuong: 0,
    Gia: 0,
    thongsokythuats: [{ IdThongSo: 0, TenTS: "", GiaTri: "" }],
  });
  const [thongSoList, setThongSoList] = useState<ThongSo[]>([]);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetch(`${process.env.API}/sanphams/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSanPham(data);
        setThongSoList(
          data.thongsokythuats.map((item: any) => ({
            TenTS: item.TenTS,
            GiaTri: item.GiaTri,
          }))
        );
      });

    fetch(`${process.env.API}/danhgias/sanpham/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRating((data / 5) * 100);
      });
  }, []);

  return (
    <div className="pt-2">
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="font-semibold mr-2 text-xl">Thông tin sản phẩm</div>
        <p className="text-[40px] text-[var(--primary-color)]">{sanPham.Ten}</p>
        <p className="text-lg text-gray-600">{sanPham.MoTa}</p>
        <p className="text-md text-gray-600 mt-2">
          Bảo hành: {sanPham.BaoHanh ?? 0} tháng
        </p>
        <p className="text-md text-gray-600 mt-1">
          Tồn kho: {sanPham.SoLuong} sản phẩm
        </p>
        <p className="text-md text-gray-600 mt-1">
          Giá sản phẩm: {sanPham.Gia}đ
        </p>
        <div className="text-md text-gray-600 mt-1 flex items-center">
          <div className="">Đánh giá: </div>
          <div className="relative rating ml-2">
            <div className="text-gray-300 text-[15px]">★★★★★</div>
            <div
              className={`absolute text-yellow-400 top-0 left-0 overflow-hidden text-[15px]`}
              style={{ width: `${rating}%` }}
            >
              ★★★★★
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 mt-4 rounded-lg shadow">
        <ThongSoInput
          thongSoList={thongSoList}
          setThongSoList={setThongSoList}
          idSanPham={sanPham.IdSanPham}
        />
      </div>
    </div>
  );
}

export default ChiTietSanPham;
