"use client";

import { ToastContext } from "@/contexts/ToastProvider";
import Button from "@/ui/components/Button";
import FormInput from "@/ui/components/FormInput";
import { ChangeEvent, useContext, useEffect, useState } from "react";

function EditSale({
  setStateShow,
  onSuccess,
  id,
}: {
  setStateShow: any;
  onSuccess: () => void;
  id: number | string;
}) {
  const { toast } = useContext(ToastContext);

  const [sanPhams, setSanPhams] = useState([{ IdSanPham: -1, TenSanPham: "" }]);

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const defaultValue = now.toISOString().slice(0, 16);

  const [messages, setMessages] = useState({
    TenKM: "",
    IdSanPham: "",
    MucGiam: "",
    NgayBD: "",
    NgayKT: "",
  });

  const [form, setForm] = useState({
    TenKM: "",
    IdSanPham: 0,
    MucGiam: "",
    NgayBD: defaultValue,
    NgayKT: defaultValue,
  });

  useEffect(() => {

    fetch(`${process.env.API}/khuyenmais/${id}`)
      .then(res => res.json())
      .then(data => {
        const toInputDateTime = (value: string | Date) => {
          if (!value) return "";
          const d = new Date(value);
          const offset = d.getTimezoneOffset();
          const local = new Date(d.getTime() - offset * 60000);
          return local.toISOString().slice(0, 16);
        };
        const { IdSanPham, TenKM, MucGiam, NgayBD, NgayKT } = data;
        setForm({
          IdSanPham,
          TenKM,
          MucGiam,
          NgayBD: toInputDateTime(NgayBD),
          NgayKT: toInputDateTime(NgayKT)
        });

      })

    fetch(`${process.env.API}/sanphams`)
      .then((res) => res.json())
      .then((loais) => {
        loais = loais.map((item) => {
          return { IdSanPham: item.IdSanPham, TenSanPham: item.Ten };
        });
        setSanPhams([...loais]);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.API}/khuyenmais/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.state) {
      setForm({
        TenKM: "",
        IdSanPham: 0,
        MucGiam: "",
        NgayBD: "",
        NgayKT: "",
      });
      setMessages({
        TenKM: "",
        IdSanPham: "",
        MucGiam: "",
        NgayBD: "",
        NgayKT: "",
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
        Sửa khuến mại
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <div className="flex flex-col mt-3">
          <label htmlFor="" className="mb-1 text-gray-600">
            Sản phẩm
          </label>
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
              setMessages({ ...messages, [e.target.name]: "" });
            }}
            name="IdSanPham"
            id=""
            className="w-full px-4 py-2 border border-[2px] rounded-lg border-gray-600"
          >
            {sanPhams.map((item, index) => (
              <option key={index} value={item.IdSanPham} selected={item.IdSanPham == form.IdSanPham}>
                {item.TenSanPham}
              </option>
            ))}
          </select>
        </div>

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            setMessages({ ...messages, [e.target.name]: "" });
          }}
          value={form.TenKM}
          label="Tên khuyến mãi"
          name="TenKM"
          id="TenKM"
          place="Tên khuyến mãi"
          require={false}
          message={messages["TenKM"]}
        />

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            setMessages({ ...messages, [e.target.name]: "" });
          }}
          value={form.MucGiam}
          label="Mức giảm %"
          name="MucGiam"
          id="MucGiam"
          type="number"
          place="Mức giảm %"
          require={true}
          message={messages["MucGiam"]}
        />

        <div className="flex flex-col mt-3">
          <label htmlFor="NgayBD" className="mb-1 text-gray-600">
            Thời gian bắt đầu
          </label>
          <input
            id="NgayBD"
            name="NgayBD"
            type="datetime-local"
            value={form.NgayBD || defaultValue}
            onChange={(e) => {
              handleChange(e);
              setMessages({ ...messages, NgayBD: "" });
            }}
            className="w-full px-4 py-2 border border-[2px] rounded-lg border-gray-600 mb-1"
          />
          <p className="text-red-600 text-sm">{messages["NgayBD"]}</p>
        </div>

        <div className="flex flex-col mt-3">
          <label htmlFor="NgayKT" className="mb-1 text-gray-600">
            Thời gian kết thúc
          </label>
          <input
            id="NgayKT"
            name="NgayKT"
            type="datetime-local"
            value={form.NgayKT || defaultValue}
            onChange={(e) => {
              handleChange(e);
              setMessages({ ...messages, NgayKT: "" });
            }}
            className="w-full px-4 py-2 border border-[2px] rounded-lg border-gray-600 mb-1"
          />
          <p className="text-red-600 text-sm">{messages["NgayKT"]}</p>
        </div>

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

export default EditSale;
