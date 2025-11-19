import { ToastContext } from "@/contexts/ToastProvider";
import Button from "@/ui/components/Button";
import FormInput from "@/ui/components/FormInput";
import { ChangeEvent, useContext, useEffect, useState } from "react";


function EditStaff({
  setStateShow,
  onSuccess,
  id,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStateShow: any;
  onSuccess: () => void;
  id: number | string;
}) {
  const { toast } = useContext(ToastContext);

  const [messages, setMessages] = useState({
    Username: "",
    SDT: "",
    CCCD: "",
    MatKhau: "",
    Confirm: "",
    Ten: "",
    ChucVu: "",
    Luong: ""
  });
  
  const [form, setForm] = useState({
    Username: "",
    SDT: "",
    CCCD: "",
    MatKhau: "",
    Confirm: "",
    Ten: "",
    ChucVu: "",
    Luong: 0,
    IdVaiTro: 1
  });

  useEffect(() => {
    fetch(`${process.env.API}/nhanviens/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          Username: data.taikhoan.Username,
          SDT: data.SDT,
          CCCD: data.CCCD,
          MatKhau: data.taikhoan.MatKhau,
          Confirm: data.taikhoan.MatKhau,
          Ten: data.Ten,
          ChucVu: data.ChucVu,
          Luong: data.Luong,
          IdVaiTro: 1
        })
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form)

    const res = await fetch(`${process.env.API}/nhanviens/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.state) {
      setForm({
        Username: "",
        SDT: "",
        CCCD: "",
        MatKhau: "",
        Confirm: "",
        Ten: "",
        ChucVu: "",
        Luong: 0,
        IdVaiTro: 1
      });
      setMessages({
        Username: "",
        SDT: "",
        CCCD: "",
        MatKhau: "",
        Confirm: "",
        Ten: "",
        ChucVu: "",
        Luong: ""
      });
      toast.success(data.notify);
      onSuccess();
      setStateShow(false);
    } else {
      setMessages({ ...data.messages });
      if (data.notify) {
        toast.error(data.notify);
      }
    }
  };

  return (
    <div className="">
      <div className="text-2xl text-[var(--primary-color)] flex justify-center mb-3">
        Sửa Nhân viên
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
          value={form.CCCD}
          label="CCCD"
          name="CCCD"
          id="cccd"
          place="CCCD"
          require={true}
          message={messages["CCCD"]}
        />

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.Ten}
          label="Họ tên nhân viên"
          type="text"
          name="Ten"
          id="Ten"
          place="Họ tên nhân viên"
          require={true}
          message={messages["Ten"]}
        />
        
        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.ChucVu}
          label="Chức vụ nhân viên"
          type="text"
          name="ChucVu"
          id="ChucVu"
          place="Chức vụ nhân viên"
          require={true}
          message={messages["ChucVu"]}
        />
        
        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.Luong}
          label="Lương"
          type="number"
          name="Luong"
          id="Luong"
          place="Lương"
          require={true}
          message={messages["Luong"]}
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

export default EditStaff;
