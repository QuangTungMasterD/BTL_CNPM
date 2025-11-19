'use client'

import Button from "@/ui/components/Button";
import ConfirmDelete from "@/ui/components/ConfirmDelete";
import Popup from "@/ui/components/Popup";
import AddCategory from "@/ui/manager/AddCategory";
import AddCompany from "@/ui/manager/AddCompany";
import EditCategory from "@/ui/manager/EditCategory";
import EditCompany from "@/ui/manager/EditCompany";
import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface ICompany {
  IdLoai: number;
  TenLoai: string;
  sanphams: number;
}

function Categorys() {

  const [companys, setCategorys] = useState<ICompany[] | null>()
  const [idHang, setIdLoai] = useState(-1);
  const [stateShowPopupDelete, setStateShowPopupDelete] = useState(false);
  const [stateShowPopupAdd, setStateShowPopupAdd] = useState(false);
  const [stateShowPopupEdit, setStateShowPopupEdit] = useState(false);

  const getDataSanPham = () => {
    fetch(`${process.env.API}/loais`)
      .then(res => res.json())
      .then(data => {
        setCategorys(data);
      })
  }

  useEffect(() => {
    getDataSanPham();
  }, []);

  return (
    <div className="bg-white p-4 rounded-b-lg shadow">
      <div className="mb-3">
        <Button onClick={() => setStateShowPopupAdd(true)}><FontAwesomeIcon icon={faPlus}/> Loại sản phẩm</Button>
      </div>
      
      {stateShowPopupDelete && <Popup state={stateShowPopupDelete} setState={setStateShowPopupDelete}>
        <ConfirmDelete api="loais" onDeleteSuccess={getDataSanPham} content="Xác nhận xóa loại sản phẩm này" id={idHang} setStateShow={setStateShowPopupDelete} />
      </Popup>}
      {stateShowPopupAdd && <Popup state={stateShowPopupAdd} setState={setStateShowPopupAdd}>
        <AddCategory onSuccess={getDataSanPham} setStateShow={setStateShowPopupAdd} />
      </Popup>}
      {stateShowPopupEdit && <Popup state={stateShowPopupEdit} setState={setStateShowPopupEdit}>
        <EditCategory onSuccess={getDataSanPham} setStateShow={setStateShowPopupEdit} id={idHang} />
      </Popup>}


      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-xl border border-gray-300">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-gray-300-medium">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                STT
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Tên loại
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Số sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {companys?.map((items, index) => {
              if (index < companys.length - 1) {
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
                    <td className="px-6 py-4">{items.TenLoai}</td>
                    <td className="px-6 py-4">{items.sanphams ?? 0} sản phẩm</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setIdLoai(items.IdLoai);
                          setStateShowPopupDelete(true);
                        }}
                        className="text-[16px] text-red-600 mx-1 hover:underline cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        onClick={() => {
                          setIdLoai(items.IdLoai);
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
                  <td className="px-6 py-4">{items.TenLoai}</td>
                  <td className="px-6 py-4">{items.sanphams ?? 0} sản phẩm</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setIdLoai(items.IdLoai);
                        setStateShowPopupDelete(true);
                      }}
                      className="text-[16px] text-red-600 hover:underline mx-1 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      onClick={() => {
                        setIdLoai(items.IdLoai);
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
        {companys?.length == 0 && (
          <div className="px-6 py-4 flex justify-center text-gray-600">
            Không tìm thấy loại sản phẩm nào
          </div>
        )}
      </div>
    </div>
  );
}

export default Categorys;
