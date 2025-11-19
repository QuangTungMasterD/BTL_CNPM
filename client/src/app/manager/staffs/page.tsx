'use client'

import Button from "@/ui/components/Button";
import ConfirmDelete from "@/ui/components/ConfirmDelete";
import Pagination from "@/ui/components/Pagination";
import Popup from "@/ui/components/Popup";
import AddStaff from "@/ui/manager/AddStaff";
import EditStaff from "@/ui/manager/EditStaff";
import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


function ManagerStaff() {

  const query = useSearchParams();
  const [page, setPage] = useState(1);
  const [idStaff, setIdStaff] = useState<number | string>(-1);
  const [stateShowPopupDelete, setStateShowPopupDelete] = useState(false);
  const [stateShowPopupAdd, setStateShowPopupAdd] = useState(false);
  const [stateShowPopupEdit, setStateShowPopupEdit] = useState(false);
  const [nhanViens, setNhanViens] = useState({data: [{ IdNhanVien: '', Ten: '', SDT: '', CCCD: '', Luong: 0 }], page: 0, total: 0, totalPages: 0});

  useEffect(() => {
      const pageFromQuery = query.get("page");
      if (pageFromQuery) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPage(Number(pageFromQuery));
      }
    }, [query]);
  
    const getDataNhanVien = () => {
      fetch(`${process.env.API}/nhanviens?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          setNhanViens(data);
        });
    }
  
    useEffect(() => {
      getDataNhanVien();
    }, [page]);

  return (
    <div className="p-4 bg-white rounded-b-xl">
      <div className="mb-3 flex">
        <Button onClick={() => setStateShowPopupAdd(true)}><FontAwesomeIcon icon={faPlus}/> Nhân viên</Button>
        <Pagination totalPage={nhanViens?.totalPages || 0} curPage={page} setPage={setPage} />
      </div>
      {stateShowPopupDelete && <Popup state={stateShowPopupDelete} setState={setStateShowPopupDelete}>
        <ConfirmDelete api="nhanviens" onDeleteSuccess={getDataNhanVien} content="Xác nhận xóa nhân viên này" id={idStaff} setStateShow={setStateShowPopupDelete} />
      </Popup>}
      {stateShowPopupAdd && <Popup state={stateShowPopupAdd} setState={setStateShowPopupAdd}>
        <AddStaff onSuccess={getDataNhanVien} setStateShow={setStateShowPopupAdd} />
      </Popup>}

      {stateShowPopupEdit && <Popup state={stateShowPopupEdit} setState={setStateShowPopupEdit}>
        <EditStaff id={idStaff} onSuccess={getDataNhanVien} setStateShow={setStateShowPopupEdit} />
      </Popup>}

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-xl border border-gray-300">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-gray-300-medium">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                STT
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Tên nhân viên
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                CCCD
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Lương
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {nhanViens?.data.map((items, index) => {
              if (index < nhanViens.data.length - 1) {
                return (
                  <tr key={index} className="bg-neutral-primary-soft border-b border-gray-300 hover:bg-gray-100">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{items.Ten}</td>
                    <td className="px-6 py-4">{items.SDT}</td>
                    <td className="px-6 py-4">{items.CCCD}</td>
                    <td className="px-6 py-4">{items.Luong}</td>
                    <td className="px-6 py-4 text-right">
                      {/* <a
                        href="#"
                        className="text-[16px] text-blue-600 hover:underline"
                      >
                        <FontAwesomeIcon className="text-[16px]" icon={faCircleInfo} />
                      </a> */}
                      <button onClick={() => {setIdStaff(items.IdNhanVien); setStateShowPopupDelete(true)}} className="text-[16px] text-red-600 mx-1 hover:underline cursor-pointer"><FontAwesomeIcon icon={faTrash} /></button>
                      <button onClick={() => {setIdStaff(items.IdNhanVien); setStateShowPopupEdit(true)}} className="text-[16px] text-green-600 hover:underline cursor-pointer"><FontAwesomeIcon icon={faPenToSquare} /></button>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={index} className="bg-neutral-primary-soft hover:bg-gray-100">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{items.Ten}</td>
                  <td className="px-6 py-4">{items.SDT}</td>
                  <td className="px-6 py-4">{items.CCCD}</td>
                  <td className="px-6 py-4">{items.Luong}</td>
                  <td className="px-6 py-4 text-right">
                    {/* <a
                      href={`customers/${items.IdNhanVien}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      <FontAwesomeIcon className="text-[16px]" icon={faCircleInfo} />
                    </a> */}
                    <button onClick={() => {setIdStaff(items.IdNhanVien); setStateShowPopupDelete(true)}} className="text-[16px] text-red-600 hover:underline mx-1 cursor-pointer"><FontAwesomeIcon icon={faTrash} /></button>
                    <button onClick={() => {setIdStaff(items.IdNhanVien); setStateShowPopupEdit(true)}} className="text-[16px] text-green-600 hover:underline cursor-pointer"><FontAwesomeIcon icon={faPenToSquare} /></button>
                  </td>
                </tr>
              )
            })}

            
          </tbody>
        </table>
        {nhanViens.total == 0 && (<div className="px-6 py-4 flex justify-center text-gray-600">Không tìm thấy khách hàng nào</div>)}
      </div>
    </div>
  );
}

export default ManagerStaff;
