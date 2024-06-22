import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';
import { BookOpenIcon } from '@heroicons/react/20/solid';
import {
  AcademicCapIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  RectangleStackIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/solid';
import { endpointTypes } from '../../agent/axios';

export const navItems = [
  {
    title: 'Overview',
    path: `/${endpointTypes.cms}`,
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon/>
      </SvgIcon>
    )
  },
  // {
  //   title: 'Customers',
  //   path: `/${endpointTypes.cms}/customers`,
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UsersIcon/>
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Academic',
    path: `/${endpointTypes.cms}/academic`,
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Projects',
    path: `/${endpointTypes.cms}/projects`,
    icon: (
      <SvgIcon fontSize="small">
        <AcademicCapIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Semesters',
    path: `/${endpointTypes.cms}/semesters`,
    icon: (
      <SvgIcon fontSize="small">
        <CalendarDaysIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Enrollment Plans',
    path: `/${endpointTypes.cms}/enrollment-plans`,
    icon: (
      <SvgIcon fontSize="small">
        <RectangleStackIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Enrollments',
    path: `/${endpointTypes.cms}/enrollments`,
    icon: (
      <SvgIcon fontSize="small">
        <DocumentTextIcon/>
      </SvgIcon>
    )
  },
  // {
  //   title: 'Products',
  //   path: `/${endpointTypes.cms}/products`,
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Categories',
  //   path: `/${endpointTypes}/categories`,
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <BookOpenIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Orders',
  //   path: `/${endpointTypes.cms}/orders`,
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingCartIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Coupons',
  //   path: `/${endpointTypes.cms}/coupons`,
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ReceiptPercentIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Companies',
  //   path: `/${endpointTypes.cms}/companies`,
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Account',
  //   path: `/${endpointTypes.cms}/account`,
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Settings',
  //   path: '/settings',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon/>
  //     </SvgIcon>
  //   )
  // }
];
