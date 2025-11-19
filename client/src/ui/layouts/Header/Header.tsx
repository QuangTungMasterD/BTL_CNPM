"use client";

import { useAuth } from "@/contexts/authProvider";
import Button from "@/ui/components/Button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsLoggedIn(false);

      fetch(`${process.env.API}/auth/check`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setIsLoggedIn(res.ok))
        .catch(() => setIsLoggedIn(false));
    };

    checkLogin();

    window.addEventListener("auth-change", checkLogin);

    return () => window.removeEventListener("auth-change", checkLogin);
  }, []);

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 left-0 bg-white h-[var(--height-header)] bg-white z-100 border-b border-b-[#ddd] w-full px-3 flex items-center"
        )}
      >
        <div className="">
          <Link href="/">
            <img src="/logo.png" alt="Trang chủ" className="h-[54px]" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          {isLoggedIn && (
            <ul className="flex">
              <li>
                <Link
                  href="/manager/dashboard"
                  className={clsx(
                    "ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600",
                    pathName === "/manager/dashboard" &&
                      "bg-gray-100 !text-black"
                  )}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/manager/staffs"
                  className={clsx(
                    "ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600",
                    pathName === "/manager/staffs" && "bg-gray-100 !text-black"
                  )}
                >
                  Nhân viên
                </Link>
              </li>
              <li>
                <Link
                  href="/manager/customers"
                  className={clsx(
                    "ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600",
                    pathName === "/manager/customers" &&
                      "bg-gray-100 !text-black"
                  )}
                >
                  Khách hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/manager/products"
                  className={clsx(
                    "ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600",
                    pathName === "/manager/products" &&
                      "bg-gray-100 !text-black"
                  )}
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/manager/sales"
                  className={clsx(
                    "ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600",
                    pathName === "/manager/sales" && "bg-gray-100 !text-black"
                  )}
                >
                  Khuyến mại
                </Link>
              </li>
              <li>
                <Link
                  href="/manager/companys"
                  className={clsx(
                    "ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600",
                    pathName === "/manager/companys" &&
                      "bg-gray-100 !text-black"
                  )}
                >
                  Hãng
                </Link>
              </li>
              <li>
                <Link
                  href="/manager/categorys"
                  className={clsx(
                    "ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600",
                    pathName === "/manager/categorys" &&
                      "bg-gray-100 !text-black"
                  )}
                >
                  Loại sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/manager/revenue"
                  className={clsx(
                    "ml-1 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black text-gray-600",
                    pathName === "/manager/revenue" && "bg-gray-100 !text-black"
                  )}
                >
                  Doanh thu
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="">
          <ul className="flex">
            {isLoggedIn && (
              <li>
                <Button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    window.dispatchEvent(new Event("auth-change"));
                    router.replace("/auth/login");
                  }}
                  variant="primary"
                >
                  Đăng xuất
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
