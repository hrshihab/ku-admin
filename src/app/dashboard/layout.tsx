'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardDrawer from '@/components/Dashboard/DashboardDrawer/DashboardDrawer';
import useUserInfo from '@/hooks/useUserInfo';

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const router = useRouter();
   const userInfo = useUserInfo();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      // Give a small delay to allow useUserInfo to fetch the data
      const timer = setTimeout(() => {
         setIsLoading(false);
         if (!userInfo) {
            router.push('/login');
         }
      }, 500);

      return () => clearTimeout(timer);
   }, [userInfo, router]);

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
         </div>
      );
   }

   if (!userInfo) {
      return null;
   }

   return <DashboardDrawer>{children}</DashboardDrawer>;
} 