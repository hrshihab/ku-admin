'use client';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Collapse } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import HelpIcon from '@mui/icons-material/Help';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import PeopleIcon from '@mui/icons-material/People';

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const drawerWidth = 240;

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/dashboard',
      exact: true
    },
    { 
      text: 'Career', 
      icon: <WorkIcon />, 
      path: '/dashboard/career',
      subItems: [
        { text: 'Jobs', icon: <BusinessIcon />, path: '/dashboard/career/jobs' },
        { text: 'Applications', icon: <PeopleIcon />, path: '/dashboard/career/applications' }
      ]
    },
    { 
      text: 'Medical', 
      icon: <LocalHospitalIcon />, 
      path: '/dashboard/medical',
      subItems: [
        { text: 'Appointments', icon: <MedicalInformationIcon />, path: '/dashboard/medical/appointments' },
        { text: 'Records', icon: <MedicalInformationIcon />, path: '/dashboard/medical/records' }
      ]
    },
    { text: 'News', icon: <AnnouncementIcon />, path: '/dashboard/news' },
    { text: 'Support', icon: <HelpIcon />, path: '/dashboard/support' },
    { text: 'NOC', icon: <CalendarMonthIcon />, path: '/dashboard/noc' },
    { text: 'User', icon: <PersonIcon />, path: '/dashboard/user' },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const renderMenuItem = (item: any, depth = 0) => (
    <Box key={item.text}>
      <ListItem
        button
        onClick={() => router.push(item.path)}
        sx={{
          bgcolor: isActive(item.path, item.exact) ? '#e3f2fd' : 'transparent',
          color: isActive(item.path, item.exact) ? '#1976d2' : 'inherit',
          '&:hover': {
            bgcolor: isActive(item.path, item.exact) ? '#e3f2fd' : '#f5f5f5',
          },
          pl: depth * 3 + 2,
          my: 0.5,
          mx: 1,
          borderRadius: 1,
        }}
      >
        <ListItemIcon
          sx={{
            color: isActive(item.path, item.exact) ? '#1976d2' : 'inherit',
            minWidth: '40px'
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText 
          primary={item.text}
          sx={{
            '& .MuiTypography-root': {
              fontSize: depth > 0 ? '0.9rem' : '1rem',
            }
          }}
        />
      </ListItem>
      {item.subItems && (
        <Collapse in={isActive(item.path)} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.subItems.map((subItem: any) => renderMenuItem(subItem, depth + 1))}
          </List>
        </Collapse>
      )}
    </Box>
  );

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          mt: '64px',
          zIndex: 1,
          bgcolor: '#f8f9fa',
          borderRight: '1px solid #e0e0e0'
        },
      }}
    >
      <List>
        {menuItems.map((item) => renderMenuItem(item))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 