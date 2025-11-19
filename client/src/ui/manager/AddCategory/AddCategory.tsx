'use client'

import { ToastContext } from "@/contexts/ToastProvider";
import Button from "@/ui/components/Button";
import FormInput from "@/ui/components/FormInput";
import { ChangeEvent, useContext, useState } from "react";

function AddCategory({
  setStateShow,
  onSuccess,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStateShow: any;
  onSuccess: () => void;
}) {

  const { toast } = useContext(ToastContext);

  const [valueNewCategory, setValueNewCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.API}/loais`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('token')}`, },
      body: JSON.stringify({ TenLoai: valueNewCategory }),
    });

    const data = await res.json();

    if (data.state) {
      setValueNewCategory('');
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
        Thêm hãng mới
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { setValueNewCategory(e.target.value); setMessage('') }}
          value={valueNewCategory}
          label="Tên loại sản phẩm"
          name="TenLoai"
          id="tenLoai"
          place="Tên loại sản phẩm"
          require={true}
          message={message}
        />
        
        <div className="flex justify-end mt-3">
          <Button type="submit">Thêm</Button>
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

export default AddCategory;
