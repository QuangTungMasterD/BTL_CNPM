import Button from "@/ui/components/Button";


function FormLogin() {
  return (
    <div className="">
      <div className="text-3xl mb-6 flex justify-center w-full text-[var(--primary-color)]">Đăng nhập</div>
      <form action="" className="">
        <div className="flex flex-col w-[400px]">
          <label htmlFor="Username" className="text-gray-600">Tên đăng nhập</label>
          <input type="text" className="mt-1 mb-1 border border-[2px] border-gray-500 px-4 py-2 rounded-lg" name="Username" id="Username" />
          <p className="text-red-600 text-sm">Sai tên đăng nhập</p>
        </div>

        <div className="flex flex-col w-[400px] mt-5">
          <label htmlFor="MatKhau" className="text-gray-600">Tên đăng nhập</label>
          <input type="text" className="mt-1 mb-1 border border-[2px] border-gray-500 px-4 py-2 rounded-lg" name="MatKhau" id="MatKhau" />
          <p className="text-red-600 text-sm">Sai tên đăng nhập</p>
        </div>
        <div className="mt-6 pb-4">
          <Button classNames='w-full'>Đăng nhập</Button>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
