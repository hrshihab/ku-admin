import type { Metadata } from 'next';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Providers from '@/lib/Providers/Providers';
import { Toaster } from 'sonner';

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: 'KU Admin Panel',
   description: 'Dashboard',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en'>
         <body>
            <Providers>
               <AppRouterCacheProvider>
                  <Toaster position='top-center' />
                  {children}
               </AppRouterCacheProvider>
            </Providers>
         </body>
      </html>
   );
}
