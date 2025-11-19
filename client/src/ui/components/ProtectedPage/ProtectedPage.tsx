'use client'

import { isAuthenticated } from '@/auth';
import { ToastContext } from '@/contexts/ToastProvider';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { toast } = useContext(ToastContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/auth/login');
    }
  }, []);

  if (!isAuthenticated()) return null;

  return <>{children}</>;
}
