import { SvgIcon } from '@mui/material';
import { CubeIcon, HomeIcon } from '@heroicons/react/24/outline';

const baseUrl = '/portal'
export const navItems = [
  {
    title: 'Home',
    path: `${baseUrl}`,
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Dashboard',
    path: `/${baseUrl}/dashboard`,
    icon: (
      <SvgIcon fontSize="small">
        <CubeIcon/>
      </SvgIcon>
    )
  },
];
