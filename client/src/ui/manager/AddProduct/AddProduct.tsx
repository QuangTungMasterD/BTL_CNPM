import { ToastContext } from "@/contexts/ToastProvider";
import Button from "@/ui/components/Button";
import FormInput from "@/ui/components/FormInput";
import { ChangeEvent, useContext, useEffect, useState } from "react";

function AddProduct({
  setStateShow,
  onSuccess,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStateShow: any;
  onSuccess: () => void;
}) {
  const { toast } = useContext(ToastContext);

  const [hangs, setHangs] = useState([ { IdHang: -1, TenHang: '-- Không --' } ]);
  const [loais, setLoais] = useState([ { IdLoai: -1, TenLoai: '-- Không --' } ]);

  const [messages, setMessages] = useState({
    Ten: "",
    MoTa: "",
    SoLuong: "",
    Gia: "",
    BaoHanh: "",
  });

  const [form, setForm] = useState({
    Ten: "",
    MoTa: "",
    SoLuong: "",
    Gia: "",
    BaoHanh: "",
    IdLoai: 0,
    IdHang: 0
  });

  useEffect(() => {
    fetch(`${process.env.API}/loais`)
      .then(res => res.json())
      .then(loais => {
        setLoais([{ IdLoai: -1, TenLoai: '-- Không --' }, ...loais])
      })

    fetch(`${process.env.API}/hangs`)
      .then(res => res.json())
      .then(hangs => {
        setHangs([{ IdHang: -1, TenHang: '-- Không --' }, ...hangs])
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.API}/sanphams`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.state) {
      setForm({
        Ten: "",
        MoTa: "",
        SoLuong: "",
        Gia: "",
        BaoHanh: "",
        IdLoai: 0,
        IdHang: 0
      });
      setMessages({
        Ten: "",
        MoTa: "",
        SoLuong: "",
        Gia: "",
        BaoHanh: "",
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
        Thêm sản phẩm
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.Ten}
          label="Tên sản phẩm"
          name="Ten"
          id="Ten"
          place="Tên sản phẩm"
          require={true}
          message={messages["Ten"]}
        />

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.MoTa}
          label="Mô tả"
          name="MoTa"
          id="MoTa"
          place="Mô tả"
          require={true}
          message={messages["MoTa"]}
        />

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.SoLuong}
          label="Tồn kho"
          name="SoLuong"
          id="SoLuong"
          place="Tồn kho"
          require={true}
          message={messages["SoLuong"]}
        />

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.Gia}
          label="Giá bán"
          name="Gia"
          id="Gia"
          place="Giá bán"
          require={true}
          message={messages["Gia"]}
        />

        <FormInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }}
          value={form.BaoHanh}
          label="Số tháng bảo hành"
          name="BaoHanh"
          id="BaoHanh"
          place="Số tháng bảo hành"
          require={true}
          message={messages["BaoHanh"]}
        />

        <div className="flex flex-col mt-3">
          <label htmlFor="" className="mb-1 text-gray-600">Hãng sản phẩm</label>
          <select onChange={(e: ChangeEvent<HTMLSelectElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }} name="IdHang" id="" className="w-full px-4 py-2 border border-[2px] rounded-lg border-gray-600">
            {hangs.map((item, index) => (<option key={index} value={item.IdHang}>{item.TenHang}</option>))}
          </select>
        </div>
        
        <div className="flex flex-col mt-3">
          <label htmlFor="" className="mb-1 text-gray-600">Loại sản phẩm</label>
          <select onChange={(e: ChangeEvent<HTMLSelectElement>) => { handleChange(e); setMessages({ ...messages, [e.target.name]: '' }) }} name="IdLoai" id="" className="w-full px-4 py-2 border border-[2px] rounded-lg border-gray-600">
            {loais.map((item, index) => (<option key={index} value={item.IdLoai}>{item.TenLoai}</option>))}
          </select>
        </div>

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

export default AddProduct;
