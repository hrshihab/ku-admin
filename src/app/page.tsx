'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserInfo from '@/hooks/useUserInfo';

export default function HomePage() {
  const router = useRouter();
  const userInfo = useUserInfo();

  useEffect(() => {
    if (userInfo) {
      // Redirect to dashboard if the user is already logged in
      router.replace('/dashboard');
    } else {
      // Redirect to login page if the user is not logged in
      router.replace('/login');
    }
  }, [userInfo, router]);

  // Optional: Return a minimal loading indicator
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}