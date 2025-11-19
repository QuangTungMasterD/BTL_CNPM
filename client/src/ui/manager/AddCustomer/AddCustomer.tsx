"use client";

import { ToastContext } from "@/contexts/ToastProvider";
import Button from "@/ui/components/Button";
import FormInput from "@/ui/components/FormInput";
import { ChangeEvent, useContext, useState } from "react";

function AddCustomer({
  setStateShow,
  onSuccess,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStateShow: any;
  onSuccess: () => void;
}) {
  const { toast } = useContext(ToastContext);

  const [messages, setMessages] = useState({
    Username: "",
    SDT: "",
    Email: "",
    MatKhau: "",
    Confirm: "",
    Ten: "",
  });

  const [form, setForm] = useState({
    Username: "",
    SDT: "",
    Email: "",
    MatKhau: "",
    Confirm: "",
    Ten: "",
    IdVaiTro: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.API}/khachhangs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.state) {
      setForm({
        Username: "",
        SDT: "",
        Email: "",
        MatKhau: "",
        Confirm: "",
        Ten: "",
        IdVaiTro: 2,
      });
      setMessages({
        Username: "",
        SDT: "",
        Email: "",
        MatKhau: "",
        Confirm: "",
        Ten: "",
      });
      toast.success(data.notify);
      onSuccess();
      setStateShow(false);
    } else {
      setMessages({ ...data.messages });
      console.log(messages);
      if (data.notify) {
        toast.error(data.notify);
      }
    }
  };

  return (
    <div className="">
      <div className="text-2xl text-[var(--primary-color)] flex justify-center mb-3">
        Tạo khách hàng
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.Username}
          label="Tên đăng nhập"
          name="Username"
          id="username"
          place="Tên đăng nhập"
          require={true}
          message={messages["Username"]}
        />

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.SDT}
          label="Số điện thoại"
          name="SDT"
          id="SDT"
          place="Số điện thoại"
          require={true}
          message={messages["SDT"]}
        />

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.Email}
          label="Email"
          type="email"
          name="Email"
          id="email"
          place="Email"
          require={true}
          message={messages["Email"]}
        />

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.MatKhau}
          label="Mật khẩu"
          type="password"
          name="MatKhau"
          id="matKhau"
          place="Mật khẩu"
          require={true}
          message={messages["MatKhau"]}
        />
        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.Confirm}
          label="Xác nhận mật khẩu"
          type="password"
          name="Confirm"
          id="Confirm"
          place="Xác nhận mật khẩu"
          require={true}
          message={messages["Confirm"]}
        />

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.Ten}
          label="Họ tên khách hàng"
          type="text"
          name="Ten"
          id="Ten"
          place="Họ tên khách hàng"
          require={true}
          message=""
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

export default AddCustomer;
