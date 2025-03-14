import Link from 'next/link';
import {
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
} from '@mui/material';
import { DrawerItem } from '@/types';
import { usePathname } from 'next/navigation';

type IProps = {
   item: DrawerItem;
};

const SidebarItem = ({ item }: IProps) => {
   // Adjust the path based on whether it's a profile or a dashboard link
   const linkPath = `/dashboard${item.path === 'dashboard' ? '' : '/' + item.path}`;
   const pathname = usePathname();

   // Check if the current path matches or if it's a nested route
   const isActive = pathname === linkPath || pathname.startsWith(linkPath);

   return (
      <ListItem
         disablePadding
         component={Link}
         href={linkPath}
         sx={{
            ...(isActive
               ? {
                    borderRight: '3px solid #1586FD',
                    '& svg': {
                       color: '#1586FD',
                    },
                 }
               : {}), // active styling when on the correct path
            mb: 1,
         }}
      >
         <ListItemButton sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: '50px' }}>{item.icon && <item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
         </ListItemButton>
      </ListItem>
   );
};

export default SidebarItem;
