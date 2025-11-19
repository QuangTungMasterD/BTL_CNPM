'use client'

import { ToastContext } from "@/contexts/ToastProvider";
import Button from "@/ui/components/Button";
import FormInput from "@/ui/components/FormInput";
import { ChangeEvent, useContext, useEffect, useState } from "react";


function EditCompany({
  setStateShow,
  onSuccess,
  id,
}: {
  setStateShow: any;
  onSuccess: () => void;
  id: number | string;
}) {
  const { toast } = useContext(ToastContext);
  
  const [valueCompany, setValueCompany] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.API}/hangs/${id}`)
      .then(res => res.json())
      .then(data => {
        setValueCompany(data.TenHang);
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.API}/hangs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ TenHang: valueCompany }),
    });

    const data = await res.json();

    if (data.state) {
      setValueCompany('');
      setMessage('');
      toast.success(data.notify);
      onSuccess();
      setStateShow(false);
    } else {
      setMessage(data.message);
      if (data.notify) {
        toast.error(data.notify);
      }
    }
  };

  return (
    <div className="">
      <div className="text-2xl text-[var(--primary-color)] flex justify-center mb-3">
        Sửa tên hãng
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { setValueCompany(e.target.value); setMessage('') }}
          value={valueCompany}
          label="Tên hãng"
          name="TenHang"
          id="tenHang"
          place="Tên hãng"
          require={true}
          message={message}
        />
        
        <div className="flex justify-end mt-3">
          <Button type="submit">Sửa</Button>
          <Button
            onClick={() => {
              setStateShow(false);
            }}
            variant="danger"
            classNames="ml-2"
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditCompany;
