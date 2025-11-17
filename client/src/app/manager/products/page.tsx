"use client";

import Button from "@/ui/components/Button";
import Popup from "@/ui/components/Popup";
import AddProduct from "@/ui/manager/AddProduct/AddProduct";
import { faCircleInfo, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Products() {
  const query = useSearchParams();
  const [page, setPage] = useState(1);
  const [sanPhams, setSanPhams] = useState({data: [{ IdSanPham: 0, Ten: '', SoLuong: '', BaoHanh: '', Gia: '', MoTa: '' }], page: 0, total: 0, totalPage: 0});
  const [idSanPham, setIdSanPham] = useState(-1);
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

  const getDataSanPham = () => {
    fetch(`${process.env.API}/sanphams?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setSanPhams(data);
      });
  };

  useEffect(() => {
    getDataSanPham();
  }, [page]);

  return (
    <div className="p-4 bg-white rounded-b-xl">

      <div className="mb-3">
        <Button onClick={() => setStateShowPopupAdd(true)}><FontAwesomeIcon icon={faPlus}/> Sản phẩm</Button>
      </div>
      {/* {stateShowPopupDelete && <Popup state={stateShowPopupDelete} setState={setStateShowPopupDelete}>
        <ConfirmDelete api="khachhangs" onDeleteSuccess={getDataSanPham} content="Xác nhận xóa người dùng này" id={idSanPham} setStateShow={setStateShowPopupDelete} />
      </Popup>} */}
      {stateShowPopupAdd && <Popup state={stateShowPopupAdd} setState={setStateShowPopupAdd}>
        <AddProduct onSuccess={getDataSanPham} setStateShow={setStateShowPopupAdd} />
      </Popup>}

      {/* {stateShowPopupEdit && <Popup state={stateShowPopupEdit} setState={setStateShowPopupEdit}>
        <EditCustomer id={idSanPham} onSuccess={getDataSanPham} setStateShow={setStateShowPopupEdit} />
      </Popup>} */}

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-xl border border-gray-300">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-gray-300-medium">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                STT
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Giá
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Tồn kho
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Bảo hành
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sanPhams?.data.map((items, index) => {
              if (index < sanPhams.data.length - 1) {
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
                    <td className="px-6 py-4">{items.Ten}</td>
                    <td className="px-6 py-4">{items.Gia}</td>
                    <td className="px-6 py-4">{items.SoLuong}</td>
                    <td className="px-6 py-4">{items.BaoHanh}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`products/${items.IdSanPham}`}
                        className="text-[16px] text-blue-600 hover:underline"
                      >
                        <FontAwesomeIcon
                          className="text-[16px]"
                          icon={faCircleInfo}
                        />
                      </a>
                      <button
                        onClick={() => {
                          setIdSanPham(items.IdSanPham);
                          setStateShowPopupDelete(true);
                        }}
                        className="text-[16px] text-red-600 mx-1 hover:underline cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        onClick={() => {
                          setIdSanPham(items.IdSanPham);
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
                  <td className="px-6 py-4">{items.Ten}</td>
                  <td className="px-6 py-4">{items.Gia}</td>
                  <td className="px-6 py-4">{items.SoLuong}</td>
                  <td className="px-6 py-4">{items.BaoHanh}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`products/${items.IdSanPham}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      <FontAwesomeIcon
                        className="text-[16px]"
                        icon={faCircleInfo}
                      />
                    </a>
                    <button
                      onClick={() => {
                        setIdSanPham(items.IdSanPham);
                        setStateShowPopupDelete(true);
                      }}
                      className="text-[16px] text-red-600 hover:underline mx-1 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      onClick={() => {
                        setIdSanPham(items.IdSanPham);
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
        {sanPhams.total == 0 && (
          <div className="px-6 py-4 flex justify-center text-gray-600">
            Không tìm thấy sản phẩm nào
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
