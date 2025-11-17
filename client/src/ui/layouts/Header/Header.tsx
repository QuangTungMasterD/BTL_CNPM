'use client'

import FormLogin from "@/ui/auth/FormLogin";
import Button from "@/ui/components/Button";
import Popup from "@/ui/components/Popup";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


function Header() {
  const [stateShowFormLogin, setStateShowFormLogin] = useState(false);
  const pathName = usePathname();
  return (
    <>
    <Popup state={stateShowFormLogin} setState={setStateShowFormLogin}><FormLogin/></Popup>
      <div className={clsx('fixed top-0 left-0 bg-white h-[var(--height-header)] border-b border-b-[#ddd] w-full px-3 flex items-center')}>
        <div className="">
          <Link href='/'><img src="/logo.png" alt="Trang chủ" className="h-[54px]" /></Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <ul className="flex">
            <li><Link href="/manager/dashboard" className={clsx("ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600", pathName === "/manager/dashboard" && "bg-gray-100 !text-black")}>Dashboard</Link></li>
            <li><Link href="/manager/staffs" className={clsx("ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600", pathName === "/manager/staffs" && "bg-gray-100 !text-black")}>Nhân viên</Link></li>
            <li><Link href="/manager/products" className={clsx("ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600", pathName === "/manager/products" && "bg-gray-100 !text-black")}>Sản phẩm</Link></li>
            <li><Link href="/manager/customers" className={clsx("ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600", pathName === "/manager/customers" && "bg-gray-100 !text-black")}>Khách hàng</Link></li>
          </ul>
        </div>
        <div className="">
          <ul className="flex">
            <li><Button onClick={() => {setStateShowFormLogin(true)}} variant="primary">Đăng nhập</Button></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
