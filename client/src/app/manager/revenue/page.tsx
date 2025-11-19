'use client'

import Pagination from "@/ui/components/Pagination";
import { faCircleInfo, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
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
  totalValue: number;
}

export interface HoaDonResponse {
  data: HoaDon[];
  total: number;
  page: number;
  totalPages: number;
}

function Revenue() {

  const query = useSearchParams();
  const [page, setPage] = useState(1);
  const [hoaDons, setHoaDons] = useState<HoaDonResponse>();
  const [month, setMonth] = useState(1);

  useEffect(() => {
    const pageFromQuery = query.get("page");
    if (pageFromQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(Number(pageFromQuery));
    }
  }, [query]);

  const getDataSanPham = () => {
    fetch(`${process.env.API}/hoadons?page=${page}&month=${month}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setHoaDons(data);
      });
  };

  useEffect(() => {
    getDataSanPham();
  }, [page, month]);

  return (
    <div className="p-4 bg-white rounded-b-xl">
      <div className="mb-3 flex">
        <Pagination totalPage={hoaDons?.totalPages || 1} curPage={page} setPage={setPage} />
        <div className="">
          <select className="border border-[1px] border-gray-300 px-4 py-3 rounded-sm" name="" id="" onChange={(e) => setMonth(Number(e.target.value))}>
            <option className="text-gray-700" value="1">1 tháng</option>
            <option className="text-gray-700" value="2">2 tháng</option>
            <option className="text-gray-700" value="3">3 tháng</option>
            <option className="text-gray-700" value="6">6 tháng</option>
            <option className="text-gray-700" value="12">1 năm</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-xl border border-gray-300">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-gray-300-medium">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                STT
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Số sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Tổng đơn
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Ngày mua
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                <span className="sr-only">Chi tiết</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {hoaDons?.data.map((items, index) => {
              if (index < hoaDons.data.length - 1) {
                return (
                  <tr
                    key={index}
                    className="bg-neutral-primary-soft border-b border-gray-300 hover:bg-gray-100"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{items.chitiethoadons?.reduce((sum, item) => sum + item.SoLuong, 0)}</td>
                    <td className="px-6 py-4">{items.totalValue}đ</td>
                    <td className="px-6 py-4">{new Date(items.NgayMua).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`revenue/${items.IdHoaDon}`}
                        className="text-[16px] text-blue-600 hover:underline"
                      >
                        <FontAwesomeIcon
                          className="text-[16px]"
                          icon={faCircleInfo}
                        />
                      </a>
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={index}
                  className="bg-neutral-primary-soft hover:bg-gray-100"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{items.chitiethoadons?.reduce((sum, item) => sum + item.SoLuong, 0)}</td>
                  <td className="px-6 py-4">{items.totalValue}đ</td>
                    <td className="px-6 py-4">{new Date(items.NgayMua).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`revenue/${items.IdHoaDon}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      <FontAwesomeIcon
                        className="text-[16px]"
                        icon={faCircleInfo}
                      />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {hoaDons?.total == 0 && (
          <div className="px-6 py-4 flex justify-center text-gray-600">
            Không tìm thấy sản phẩm nào
          </div>
        )}
      </div>
    </div>
  );
}

export default Revenue;
