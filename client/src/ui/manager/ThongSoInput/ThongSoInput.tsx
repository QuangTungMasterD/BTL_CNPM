'use client';

import { useContext, useState } from 'react';
import Button from '@/ui/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastContext } from '@/contexts/ToastProvider';

interface ThongSo {
  TenTS: string;
  GiaTri: string;
}

interface Props {
  thongSoList: ThongSo[];
  setThongSoList: (list: ThongSo[]) => void;
  idSanPham: number
}

export default function ThongSoInput({ thongSoList, setThongSoList, idSanPham }: Props) {
  const { toast } = useContext(ToastContext);
  const addRow = () => {
    setThongSoList([{ TenTS: '', GiaTri: '' }, ...thongSoList]);
  };

  const removeRow = (index: number) => {
    setThongSoList(thongSoList.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: 'TenTS' | 'GiaTri', value: string) => {
    const newList = [...thongSoList];
    newList[index][field] = value;
    setThongSoList(newList);
  };

  const res = () => {
    const thongsokythuats = thongSoList;
    fetch(`${process.env.API}/thongsokythuats/${idSanPham}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(thongsokythuats),
    }).then(res => res.json())
    .then(data => {
      if(data.state) toast.success(data.notify);
    });
  }
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="font-semibold mr-2 text-xl">Thông số kỹ thuật</h3>
          <Button onClick={res} size="sm"><FontAwesomeIcon icon={faCheck} /> Xác nhận</Button>
        </div>
        <div className="">
          <Button onClick={addRow} size="sm"><FontAwesomeIcon icon={faPlus} /> Thêm</Button>
        </div>
      </div>

      {thongSoList.map((ts, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            required
            name='TenTS'
            placeholder="Tên thông số"
            value={ts.TenTS}
            onChange={(e) => updateRow(index, 'TenTS', e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <input
            required
            name='GiaTri'
            placeholder="Giá trị"
            value={ts.GiaTri}
            onChange={(e) => updateRow(index, 'GiaTri', e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <Button
            onClick={() => removeRow(index)}
            variant="danger"
            size="sm"
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
      ))}

      {thongSoList.length === 0 && (
        <p className="text-gray-500 text-sm">Chưa có thông số</p>
      )}
    </div>
  );
}