import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import SupportIcon from '@mui/icons-material/Support';
import HelpIcon from '@mui/icons-material/Help';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { DrawerItem } from '@/types';

export const sidebarItems: DrawerItem[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: DashboardIcon
  },
  {
    path: 'career',
    title: 'Career',
    icon: WorkIcon
  },
  {
    path: 'noc',
    title: 'NOC',
    icon: SupportIcon
  },
  {
    path: 'support',
    title: 'Support',
    icon: HelpIcon
  },
  {
    path: 'news',
    title: 'User News',
    icon: NewspaperIcon
  }
]; 