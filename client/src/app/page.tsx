'use client'

import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  router.push('/manager/dashboard');
  return (
    <div className="">Home page</div>
  );
}
