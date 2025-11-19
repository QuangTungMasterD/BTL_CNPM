"use client";

import CardTotal from "@/ui/components/CardTotal";
import { faLaptop, faRectangleList, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {

  const [cardTotals, setCardTotal] = useState([{  }]);
  const [hoadons, setHoadons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [nhanvien, khachhang, sanpham, danhgia, hoadonData] = await Promise.all([
        fetch(`${process.env.API}/nhanviens/total`).then(res => res.json()),
        fetch(`${process.env.API}/khachhangs/total`).then(res => res.json()),
        fetch(`${process.env.API}/sanphams/total`).then(res => res.json()),
        fetch(`${process.env.API}/danhgias/danhgia-cuahang`).then(res => res.json()),
        fetch(`${process.env.API}/hoadons`).then(res => res.json())
      ]);

      const doanhthu = hoadonData.reduce((sum: number, hd) => {
        return sum + hd.chitiethoadons.reduce(
          (s: number, ct: { SoLuong: number; GiaBan: number }) => s + ct.SoLuong * ct.GiaBan,
          0
        );
      }, 0);

      setHoadons(hoadonData);

      setCardTotal([
        {
          icon: <FontAwesomeIcon icon={faUser} />,
          name: "Số nhân viên",
          total: nhanvien,
        },
        {
          icon: <FontAwesomeIcon icon={faUser} />,
          name: "Số khách hàng",
          total: khachhang,
        },
        {
          icon: <FontAwesomeIcon icon={faLaptop} />,
          name: "Số sản phẩm",
          total: sanpham,
        },
        {
          icon: <FontAwesomeIcon icon={faStar} className="text-yellow-100" />,
          name: "Đánh giá cửa hàng",
          total: danhgia,
        },
        {
          icon: <FontAwesomeIcon icon={faRectangleList} />,
          name: "Doanh thu",
          total: doanhthu + "đ",
        },
      ]);
    }

    fetchData();
  }, []);

  const chartLabels = hoadons.map((hd) => `HD${hd.IdHoaDon}`);
  const chartData = hoadons.map((hd) =>
    hd.chitiethoadons.reduce(
      (sum: number, ct: { SoLuong: number; GiaBan: number }) => sum + ct.SoLuong * ct.GiaBan,
      0
    )
  );

  const doanhThuConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: "Doanh thu (đ)",
        data: chartData,
        backgroundColor: "rgba(54,162,235,0.6)",
      },
    ],
  };

  return (
    <div className="p-4 space-y-4">

      <div className="grid grid-cols-5 gap-4">
        {cardTotals.map((item, index) => (
          <CardTotal
            key={index}
            icon={item.icon}
            name={item.name}
            total={item.total}
          />
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">
          Doanh thu theo hóa đơn
        </h2>

        <Bar data={doanhThuConfig} />
      </div>
    </div>
  );
}

export default Dashboard;
