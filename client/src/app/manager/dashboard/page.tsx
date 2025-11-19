'use client'

import CardTotal from "@/ui/components/CardTotal";
import { faLaptop, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


function Dashboard() {

  const [cardTotals, setCardTotal] = useState([{
        icon: <FontAwesomeIcon icon={faUser} />,
        name: '',
        total: 0
      },]);

  useEffect(() => {
  async function fetchData() {
    const [nhanvien, khachhang, sanpham, danhgia] = await Promise.all([
      fetch(`${process.env.API}/nhanviens/total`).then(res => res.json()),
      fetch(`${process.env.API}/khachhangs/total`).then(res => res.json()),
      fetch(`${process.env.API}/sanphams/total`).then(res => res.json()),
      fetch(`${process.env.API}/danhgias/danhgia-cuahang`).then(res => res.json())
    ]);

    console.log(danhgia)

    setCardTotal([
      {
        icon: <FontAwesomeIcon icon={faUser} />,
        name: 'Số nhân viên',
        total: nhanvien
      },
      {
        icon: <FontAwesomeIcon icon={faUser} />,
        name: 'Số khách hàng',
        total: khachhang
      },
      {
        icon: <FontAwesomeIcon icon={faLaptop} />,
        name: 'Số sản phẩm',
        total: sanpham
      },
      {
        icon: <FontAwesomeIcon icon={faStar} className="text-yellow-100" />,
        name: 'Đánh cửa hàng',
        total: danhgia
      }
    ]);
  }

  fetchData();
}, []);

  return (
    <div className="">
      <div className="bg-white p-4 rounded-b-xl shadow grid grid-cols-6 gap-3">
        {cardTotals.map((cardItem, index) => {
          return <CardTotal icon={cardItem.icon} name={cardItem.name} total={cardItem.total} key={index} />
        })}
      </div>

      <div className="bg-white p-4 rounded-xl shadow grid grid-cols-6 gap-3 mt-3">
        
      </div>
    </div>
  );
}

export default Dashboard;
