'use client'

import Button from "@/ui/components/Button";
import ConfirmDelete from "@/ui/components/ConfirmDelete";
import Pagination from "@/ui/components/Pagination";
import Popup from "@/ui/components/Popup";
import AddSale from "@/ui/manager/AddSale";
import EditSale from "@/ui/manager/EditSale";
import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ISales {
  IdKhuyenMai: number;
  IdSanPham: number;
  TenKM: string | null;
  MucGiam: number;
  NgayBD: Date;
  NgayKT: Date;
  sanpham: {
    IdSanPham: number;
    Ten: string;
    Gia: number;
    SoLuong: string;
    MoTa: string;
    BaoHanh: number;
    IdKhuyenMai: number | null; 
    IdLoai: number | null; 
  }
}

interface IResult {
  data: ISales[],
  total: number;
  page: number;
  totalPages: number;
}

function Sales() {
  const query = useSearchParams();
  const [page, setPage] = useState(1);
  const [sales, setSales] = useState<IResult | null>()
  const [idKhuyenMai, setIdKhuyenMai] = useState(-1);
  const [stateShowPopupDelete, setStateShowPopupDelete] = useState(false);
  const [stateShowPopupAdd, setStateShowPopupAdd] = useState(false);
  const [stateShowPopupEdit, setStateShowPopupEdit] = useState(false);

  useEffect(() => {
    const pageFromQuery = query.get("page");
    if (pageFromQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(Number(pageFromQuery));
    }
  }, [query]);

  const getDataKhuyenMai = () => {
    fetch(`${process.env.API}/khuyenmais?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setSales(data);
      })
  }

  useEffect(() => {
    getDataKhuyenMai();
  }, []);

  return (
    <div className="bg-white p-4 rounded-b-lg shadow">
      <div className="mb-3 flex">
        <Button onClick={() => setStateShowPopupAdd(true)}><FontAwesomeIcon icon={faPlus}/> Khuyến mại</Button>
        <Pagination totalPage={sales?.totalPages || 1} curPage={page} setPage={setPage} />
      </div>

      {stateShowPopupDelete && <Popup state={stateShowPopupDelete} setState={setStateShowPopupDelete}>
        <ConfirmDelete api="khuyenmais" onDeleteSuccess={getDataKhuyenMai} content="Xác nhận xóa khuyến mãi này" id={idKhuyenMai} setStateShow={setStateShowPopupDelete} />
      </Popup>}
      {stateShowPopupAdd && <Popup state={stateShowPopupAdd} setState={setStateShowPopupAdd}>
        <AddSale onSuccess={getDataKhuyenMai} setStateShow={setStateShowPopupAdd} />
      </Popup>}
      {stateShowPopupEdit && <Popup state={stateShowPopupEdit} setState={setStateShowPopupEdit}>
        <EditSale onSuccess={getDataKhuyenMai} setStateShow={setStateShowPopupEdit} id={idKhuyenMai} />
      </Popup>}

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-xl border border-gray-300">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-gray-300-medium">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                STT
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Giá
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Giảm giá
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Giá bán
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Ngày bắt đầu
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Ngày kết thúc
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sales?.data.map((items, index) => {
              if (index < sales.data.length - 1) {
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
                    <td className="px-6 py-4">{items.sanpham.Ten}</td>
                    <td className="px-6 py-4">{items.sanpham.Gia}đ</td>
                    <td className="px-6 py-4">{items.MucGiam}%</td>
                    <td className="px-6 py-4">{items.MucGiam * items.sanpham.Gia / 100}đ</td>
                    <td className="px-6 py-4">{new Date(items.NgayBD).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(items.NgayKT).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setIdKhuyenMai(items.IdKhuyenMai);
                          setStateShowPopupDelete(true);
                        }}
                        className="text-[16px] text-red-600 mx-1 hover:underline cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        onClick={() => {
                          setIdKhuyenMai(items.IdKhuyenMai);
                          setStateShowPopupEdit(true);
                        }}
                        className="text-[16px] text-green-600 hover:underline cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
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
                  <td className="px-6 py-4">{items.sanpham.Ten}</td>
                  <td className="px-6 py-4">{items.sanpham.Gia}đ</td>
                  <td className="px-6 py-4">{items.MucGiam}%</td>
                  <td className="px-6 py-4">{items.MucGiam * items.sanpham.Gia / 100}đ</td>
                  <td className="px-6 py-4">{new Date(items.NgayBD).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{new Date(items.NgayKT).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setIdKhuyenMai(items.IdKhuyenMai);
                        setStateShowPopupDelete(true);
                      }}
                      className="text-[16px] text-red-600 hover:underline mx-1 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      onClick={() => {
                        setIdKhuyenMai(items.IdKhuyenMai);
                        setStateShowPopupEdit(true);
                      }}
                      className="text-[16px] text-green-600 hover:underline cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {sales?.data.length == 0 && (
          <div className="px-6 py-4 flex justify-center text-gray-600">
            Không tìm thấy khuyến mãi nào
          </div>
        )}
      </div>
    </div>
  );
}

export default Sales;
