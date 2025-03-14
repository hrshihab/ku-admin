'use client';
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import assets from '@/assets';
import { AccountCircle } from '@mui/icons-material';

interface DashboardNavbarProps {
   onSidebarToggle: () => void;
}

const DashboardNavbar = ({ onSidebarToggle }: DashboardNavbarProps) => {
   return (
      <AppBar position="fixed" sx={{ bgcolor: 'white', color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
         <Toolbar>
            <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="menu"
               sx={{ mr: 2 }}
               onClick={onSidebarToggle}
            >
               <MenuIcon />
            </IconButton>
            <Image
               src={assets.svgs.logo}
               width={40}
               height={40}
               alt="logo"
            />
            <Typography variant="h6" sx={{ ml: 1, flexGrow: 1 }}>
               PH HealthCare
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
               <IconButton color="inherit">
                  <AccountCircle />
               </IconButton>
            </Stack>
         </Toolbar>
      </AppBar>
   );
};

export default DashboardNavbar; 