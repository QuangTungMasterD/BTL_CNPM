'use client'

import { ToastContext } from "@/contexts/ToastProvider";
import Button from "@/ui/components/Button";
import FormInput from "@/ui/components/FormInput";
import { ChangeEvent, useContext, useEffect, useState } from "react";


function EditCategory({
  setStateShow,
  onSuccess,
  id,
}: {
  setStateShow: any;
  onSuccess: () => void;
  id: number | string;
}) {
  const { toast } = useContext(ToastContext);
  
  const [valueCategory, setValueCategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.API}/loais/${id}`)
      .then(res => res.json())
      .then(data => {
        setValueCategory(data.TenLoai);
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.API}/loais/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ TenLoai: valueCategory }),
    });

    const data = await res.json();

    if (data.state) {
      setValueCategory('');
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
        Sửa tên loại sản phẩm
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { setValueCategory(e.target.value); setMessage('') }}
          value={valueCategory}
          label="Tên loại sản phẩm"
          name="TenLoai"
          id="tenLoai"
          place="Tên loại sản phẩm"
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

export default EditCategory;
