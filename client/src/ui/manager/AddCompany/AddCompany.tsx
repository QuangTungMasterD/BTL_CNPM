'use client'

import { ToastContext } from "@/contexts/ToastProvider";
import Button from "@/ui/components/Button";
import FormInput from "@/ui/components/FormInput";
import { ChangeEvent, useContext, useState } from "react";

function AddCompany({
  setStateShow,
  onSuccess,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStateShow: any;
  onSuccess: () => void;
}) {

  const { toast } = useContext(ToastContext);

  const [valueNewCompany, setValueNewCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.API}/hangs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ TenHang: valueNewCompany }),
    });

    const data = await res.json();

    if (data.state) {
      setValueNewCompany('');
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => { setValueNewCompany(e.target.value); setMessage('') }}
          value={valueNewCompany}
          label="Tên hãng"
          name="TenHang"
          id="tenHang"
          place="Tên hãng"
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

export default AddCompany;
