"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/components/Button";
import { useAuth } from "@/contexts/authProvider";

function FormLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`${process.env.API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.state) {
      setError(data.message || "Đăng nhập thất bại");
      return;
    }
    
    if(data.access_token) {
      localStorage.setItem("token", data.access_token);
      setIsLoggedIn(true);
      router.push("/manager/dashboard");
    }
  };

  return (
    <div className="">
      <div className="text-3xl flex flex-col items-center justify-center mb-6 w-full text-[var(--primary-color)]">
        <div>Đăng nhập</div>
        <p className="text-sm text-gray-500 mt-2 flex flex-col items-center">
          <span>Đăng nhập tài khoản admin quản lý hệ</span>
          <span>thống cửa hàng máy tính</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-col w-[400px]">
          <label htmlFor="Username" className="text-gray-600">Tên đăng nhập</label>
          <input
            type="text"
            name="Username"
            id="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 mb-1 border border-[2px] border-gray-500 px-4 py-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col w-[400px] mt-5">
          <label htmlFor="MatKhau" className="text-gray-600">Mật khẩu</label>
          <input
            type="password"
            name="MatKhau"
            id="MatKhau"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 mb-1 border border-[2px] border-gray-500 px-4 py-2 rounded-lg"
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <div className="mt-6 pb-4 w-[400px]">
          <Button classNames="w-full" type="submit">Đăng nhập</Button>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
