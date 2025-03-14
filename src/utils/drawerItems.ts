import { DrawerItem } from '@/types';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import WorkIcon from '@mui/icons-material/Work';  // For Career
import AnnouncementIcon from '@mui/icons-material/Announcement';  // For News
import HelpIcon from '@mui/icons-material/Help';  // For Support
import BusinessIcon from '@mui/icons-material/Business';  // For NOC

export const drawerItems = (): DrawerItem[] => {
   const roleMenus: DrawerItem[] = [];

   const defaultMenus = [
     
      {
         title: 'Career',
         path: '/career',
         icon: WorkIcon,
      },
      {
         title: 'News',
         path: '/news',
         icon: AnnouncementIcon,
      },
      {
         title: 'Support',
         path: '/support',
         icon: HelpIcon,
      },
      {
         title: 'NOC',
         path: '/noc',
         icon: BusinessIcon,
      },
      {
         title: 'VC Message',
         path: '/vc-message',
         icon: PersonIcon,
      }, {
         title: 'Change Password',
         path: '/change-password',
         icon: KeyIcon,
      }
   ];

   return defaultMenus;
};
